from PIL import Image, ImageDraw

image_path = "public/photo-nobg.png"
output_path = "public/photo-nobg-clean.png"

try:
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    print(f"Processing image size: {width}x{height}")
    
    # Create a mask to erase the bottom right corner
    # Assuming logo is in the bottom right, roughly 300x300 area
    # We will make this area transparent
    
    # Create a new transparent image for the corner
    # Or just manipulate pixels directly.
    # Let's use ImageDraw to draw a transparent rectangle in the alpha channel?
    # Easier: paste a transparent rectangle.
    
    # Define area to clear (bottom-right)
    # 200px wide, 150px high from bottom right corner
    clear_w = 200
    clear_h = 150
    
    # Coordinates: (left, top, right, bottom)
    # Left = width - clear_w
    # Top = height - clear_h
    
    box = (width - clear_w, height - clear_h, width, height)
    
    # Create a completely transparent patch
    patch = Image.new("RGBA", (clear_w, clear_h), (0, 0, 0, 0))
    
    img.paste(patch, box)
    
    img.save(output_path)
    print(f"Masked bottom-right {clear_w}x{clear_h} area. Saved to {output_path}")

except Exception as e:
    print(f"Error: {e}")
