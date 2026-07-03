import fs from 'fs';
import path from 'path';
import { VertexAI } from '@google-cloud/vertexai';

const CYBERSEC_PATH = path.resolve(__dirname, '../src/data/cybersec.ts');
const CONTENT_PATH = path.resolve(__dirname, '../src/data/articleContent.ts');
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const PROMPT_PATH = path.resolve(__dirname, '../prompts/Blog-Creator.md');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'gen-lang-client-0785751854';
const LOCATION = 'us-central1';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function generateWithGemini(topic: string, description: string) {
  const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
  const model = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const blogCreatorPrompt = fs.readFileSync(PROMPT_PATH, 'utf8');

  const fullPrompt = `
${blogCreatorPrompt}

Current Topic to expand on: "${topic}"
Context/Description: "${description}"

Task: Generate a full long-form technical blog article in JSON format.
Expected JSON structure:
{
  "title": "SEO Optimized Title",
  "summary": "Short 1-2 sentence description",
  "cat": "Category (e.g. Threat Intel, AI Security, Linux)",
  "img": "Emoji",
  "cover": "Unsplash ID (e.g. photo-123456789)",
  "body": {
    "lede": "Hook paragraph",
    "sections": [
      { "heading": "Heading 1", "paragraphs": ["Para 1", "Para 2"] },
      { "heading": "Heading 2", "paragraphs": ["Para 1"] }
    ],
    "takeaways": ["Point 1", "Point 2"]
  }
}

Return ONLY the raw JSON string.
`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.candidates?.[0].content.parts[0].text || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

async function fetchLatestTrend() {
  if (!NEWS_API_KEY) return { title: "The Evolution of Zero Trust", description: "Analyzing how ZTA has changed in 2026." };
  
  const query = "cybersecurity OR ransomware OR 'zero day'";
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}&language=en`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === 'ok' && data.articles.length > 0) {
    const article = data.articles[0];
    return { title: article.title, description: article.description };
  }
  
  return { title: "Emerging Threats in AI Agents", description: "How autonomous agents are becoming the new attack surface." };
}

async function automateContent() {
  console.log('🚀 Starting CyberHawk UG Content Automation...');

  try {
    const trend = await fetchLatestTrend();
    console.log(`📡 Found trend: ${trend.title}`);

    const articleData = await generateWithGemini(trend.title, trend.description);
    const newId = Date.now();
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // 1. Prepare Metadata for cybersec.ts
    const metadataSnippet = `  { id:${newId}, title:"${articleData.title}", author:"CyberHawk UG", date:"${today}", read:"8 min", cat:"${articleData.cat}", summary:"${articleData.summary}", img:"${articleData.img}", featured:true, cover: "${articleData.cover}" },\n];`;

    // 2. Prepare Body for articleContent.ts
    const bodySnippet = `  ${newId}: a(\n    "${articleData.body.lede}",\n    ${JSON.stringify(articleData.body.sections, null, 2)},\n    ${JSON.stringify(articleData.body.takeaways)}\n  ),\n};`;

    // Update cybersec.ts
    let cybersec = fs.readFileSync(CYBERSEC_PATH, 'utf8');
    cybersec = cybersec.replace('];', metadataSnippet);
    fs.writeFileSync(CYBERSEC_PATH, cybersec);

    // Update articleContent.ts
    let articleContent = fs.readFileSync(CONTENT_PATH, 'utf8');
    articleContent = articleContent.replace('};', bodySnippet);
    fs.writeFileSync(CONTENT_PATH, articleContent);

    // Update Sitemap
    let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const sitemapEntry = `  <url><loc>https://www.cyberhawk-ug.store/blog/${newId}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n  <!-- Individual Blog Posts -->`;
    sitemap = sitemap.replace('<!-- Individual Blog Posts -->', sitemapEntry);
    fs.writeFileSync(SITEMAP_PATH, sitemap);

    console.log(`✅ Successfully generated and integrated article ID: ${newId}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Automation failed:', error.message);
    } else {
      console.error('❌ Automation failed:', error);
    }
    process.exit(1);
  }
}

automateContent();
