import fs from 'fs';

const buffer = fs.readFileSync('c:/Users/bhumi/OneDrive/Desktop/Nexgn-Internship/Nexgn/public/nexgn-logo.png');
const width = buffer.readInt32BE(16);
const height = buffer.readInt32BE(20);

console.log('PNG Dimensions:', { width, height });
