from PIL import Image

image_path = "public/photo-nobg.png"
output_path = "public/photo-nobg.png"

try:
    img = Image.open(image_path)
    width, height = img.size
    print(f"Original size: {width}x{height}")
    
    # Crop bottom 300 pixels to ensure logo removal
    crop_height = 300 
    
    # crop box is (left, upper, right, lower)
    box = (0, 0, width, height - crop_height)
    
    cropped_img = img.crop(box)
    cropped_img.save(output_path)
    print(f"Cropped image saved to {output_path} (New size: {width}x{height-crop_height})")

except Exception as e:
    print(f"Error: {e}")
