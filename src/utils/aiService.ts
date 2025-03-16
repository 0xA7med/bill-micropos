import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const API_KEY = process.env.API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const BACKUP_API_KEY = process.env.BACKUP_API_KEY;
const BACKUP_API_URL = 'https://api.deepseek.com/analyze';

interface AIResponse {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  amount: string;
  productDesc: string;
  isPaid: boolean;
}


async function analyzeWithBackupAPI(text: string): Promise<AIResponse> {
  const prompt = `
    قم بتحليل الرسالة التالية واستخراج المعلومات التالية:
    - اسم العميل
    - العنوان
    - رقم الهاتف الأول
    - رقم الهاتف الثاني (إن وجد)
    - السعر أو المبلغ المتبقي او المطلوب دفعه (إن وجد)
    - وصف المنتج
    - حالة الدفع الكامل او الجزئي (هل تم الدفع أم لا)

    ملاحظات مهمة للتحليل:
    - ابحث عن كلمات تدل على أن المبلغ مدفوع مثل: (مدفوع، تم الدفع، كاش، فودافون كاش، تحويل)
    - إذا وجدت جزء من المبلغ مدفوع سترجع القيمة المتبقية وتعتبر ان المبلغ غير مدفوع 
    - إذا لم تجد ما يدل على الدفع، اعتبر المبلغ غير مدفوع
    - إذا لم يذكر سعر أو مبلغ، اترك خانة السعر فارغة

    قم بإرجاع النتيجة بالتنسيق التالي فقط (بدون أي نص إضافي):
    الاسم: [اسم العميل]
    العنوان: [العنوان]
    الهاتف١: [رقم الهاتف الأول]
    الهاتف٢: [رقم الهاتف الثاني]
    السعر: [المبلغ]
    المنتج: [وصف المنتج]
    مدفوع: [نعم/لا]
    
    الرسالة: ${text}
  `;

  const response = await fetch(`${BACKUP_API_URL}?key=${BACKUP_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Backup API Error:', errorData);
    throw new Error(errorData.error?.message || 'Backup API request failed');
  }

  const data = await response.json();
  
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.error('Unexpected API response format:', data);
    throw new Error('Invalid API response format');
  }

  const aiText = data.candidates[0].content.parts[0].text;
  
  const extractInfo = (text: string, prefix: string): string => {
    const regex = new RegExp(`${prefix}:\\s*([^\\n]+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const isPaid = extractInfo(aiText, 'مدفوع').includes('نعم');

  const result: AIResponse = {
    name: extractInfo(aiText, 'الاسم'),
    address: extractInfo(aiText, 'العنوان'),
    phone1: extractInfo(aiText, 'الهاتف١'),
    phone2: extractInfo(aiText, 'الهاتف٢'),
    amount: extractInfo(aiText, 'السعر'),
    productDesc: extractInfo(aiText, 'المنتج'),
    isPaid
  };

  return result;
}

export async function analyzeText(text: string): Promise<AIResponse> {
  const prompt = `
    قم بتحليل الرسالة التالية واستخراج المعلومات التالية:
    - اسم العميل
    - العنوان
    - رقم الهاتف الأول
    - رقم الهاتف الثاني (إن وجد)
    - السعر أو المبلغ المتبقي او المطلوب دفعه (إن وجد)
    - وصف المنتج
    - حالة الدفع الكامل او الجزئي (هل تم الدفع أم لا)

    ملاحظات مهمة للتحليل:
    - ابحث عن كلمات تدل على أن المبلغ مدفوع مثل: (مدفوع، تم الدفع، كاش، فودافون كاش، تحويل)
    - إذا وجدت جزء من المبلغ مدفوع سترجع القيمة المتبقية وتعتبر ان المبلغ غير مدفوع 
    - إذا لم تجد ما يدل على الدفع، اعتبر المبلغ غير مدفوع
    - إذا لم يذكر سعر أو مبلغ، اترك خانة السعر فارغة

    قم بإرجاع النتيجة بالتنسيق التالي فقط (بدون أي نص إضافي):
    الاسم: [اسم العميل]
    العنوان: [العنوان]
    الهاتف١: [رقم الهاتف الأول]
    الهاتف٢: [رقم الهاتف الثاني]
    السعر: [المبلغ]
    المنتج: [وصف المنتج]
    مدفوع: [نعم/لا]
    
    الرسالة: ${text}
  `;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1000,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Primary API Error:', await response.json());
      return await analyzeWithBackupAPI(text);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    const aiText = data.candidates[0].content.parts[0].text;
    
    const extractInfo = (text: string, prefix: string): string => {
      const regex = new RegExp(`${prefix}:\\s*([^\\n]+)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    };

    const isPaid = extractInfo(aiText, 'مدفوع').includes('نعم');

    const result: AIResponse = {
      name: extractInfo(aiText, 'الاسم'),
      address: extractInfo(aiText, 'العنوان'),
      phone1: extractInfo(aiText, 'الهاتف١'),
      phone2: extractInfo(aiText, 'الهاتف٢'),
      amount: extractInfo(aiText, 'السعر'),
      productDesc: extractInfo(aiText, 'المنتج'),
      isPaid
    };

    return result;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error;
  }
}