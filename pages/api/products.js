import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the products data directly from the file system
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(jsonData);
    
    res.status(200).json({ 
      success: true, 
      count: products.length,
      products: products 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}