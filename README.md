This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:


```bash
npm install next react react-dom 
#install 
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


ขั้นตอนการติดตั้ง 
1.โหลดไฟล์ libomp.dll แล้วลงไว้ที่ windows/system32
https://www.dllme.com/dll/files/libomp140_x86_64/00637fe34a6043031c9ae4c6cf0a891d/download

--in powershell as administrator--
2.ตรวจสอบ Execution Policy ปัจจุบัน และทำการรัยคำสั่งเพื่ออนุญาตการทำงานของ model:
Get-ExecutionPolicy -List
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Set-ExecutionPolicy Bypass -Scope Process


<!-- pip uninstall torch  #ลบ torch
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124  #ลง torch -->

3.ทำการ clone huggingface โดยอ้างอิงจาก web นี้ https://huggingface.co/docs/transformers/installation


ค่ำสั่งนี้ใช้ run ใน project

python -m venv .env # สร้าง virtual enviroment 


.env\Scripts\activate  # Activate .env
pip install transformers   # ติดตั้ง transformers ลงใน .env
pip install flask  # ติดตั้ง Flask ลงใน .env ใช้ deploy และใช้งาน api web
pip install torch # ติดตั้ง torch ลงใน .env 
pip install flask_cors  # ติดตั้ง flask_cors ลงใน .env ใช้เพื่อบล็อกคำขอจากโดเมนอื่นนอกเหนือจากโดเมนของเซิร์ฟเวอร์ (เชื่อม chat กับ web) 
pip install rapidfuzz # ติดตั้ง rapidfuzz ลงใน .env ใช้ในการจับคู่ string 
pip install spacy # ใช้ทำ NLP 
python -m spacy download en_core_web_sm #โหลด modle ของ spacy ใช้ในการตัดคำ 

