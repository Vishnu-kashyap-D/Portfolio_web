from rembg import remove
from PIL import Image
import os

input_path = 'public/photo.png'
output_path = 'public/photo-nobg.png'

print(f"Processing {input_path}...")
try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print(f"Saved to {output_path}")
except Exception as e:
    print(f"Error: {e}")
