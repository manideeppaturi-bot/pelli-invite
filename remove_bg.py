from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Find background colors from edges
    bg_colors = []
    for x in range(width):
        bg_colors.append(pixels[x, 0])
        bg_colors.append(pixels[x, height-1])
    for y in range(height):
        bg_colors.append(pixels[0, y])
        bg_colors.append(pixels[width-1, y])
        
    # filter to only light grey / white
    valid_bg_colors = []
    for c in set(bg_colors):
        # Allow pure white and checkboard greys
        if c[3] > 0 and abs(c[0]-c[1]) < 15 and abs(c[1]-c[2]) < 15 and c[0] > 180:
            valid_bg_colors.append(c)
            
    print("Valid BG colors:", valid_bg_colors)
    
    # We'll do a simple BFS flood fill from all edge pixels
    queue = []
    visited = set()
    
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height-1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width-1, y))
        
    while queue:
        cx, cy = queue.pop(0)
        if (cx, cy) in visited:
            continue
        visited.add((cx, cy))
        
        p = pixels[cx, cy]
        # check if it matches any valid bg color loosely
        match = False
        if p[3] == 0:
            match = True # already transparent
        else:
            for c in valid_bg_colors:
                if abs(p[0]-c[0]) < 20 and abs(p[1]-c[1]) < 20 and abs(p[2]-c[2]) < 20:
                    match = True
                    break
        
        if match:
            pixels[cx, cy] = (0, 0, 0, 0)
            # add neighbors
            for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1), (cx+1, cy+1), (cx-1, cy-1), (cx+1, cy-1), (cx-1, cy+1)]:
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        queue.append((nx, ny))
                        
    img.save(output_path)

remove_background('/Users/monis/pelli_invite/public/mani_suppu_icon.png', '/Users/monis/pelli_invite/public/mani_suppu_icon_clean.png')
print("Cleaned mani_suppu_icon.png")

