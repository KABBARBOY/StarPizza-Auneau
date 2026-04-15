from PIL import Image
import os

os.makedirs('assets/products', exist_ok=True)

def crop_save(src, box, name, size=(600, 450)):
    """Crop box=(left, top, right, bottom) from src image, resize to size, save."""
    img = Image.open(f'assets/{src}')
    cropped = img.crop(box)
    # Resize to uniform product card size
    cropped = cropped.resize(size, Image.LANCZOS)
    out = f'assets/products/{name}'
    cropped.save(out, quality=90)
    print(f'  Saved {name} from {box} ({cropped.size})')

# ─────────────────────────────────────────────
# IMG1.JPG — Burgers (1376x768)
# Layout: 2 columns, 3 rows
# Each cell ~688x256, food photo occupies left ~260px of each cell
# Left col: x=0..460, Right col: x=460..920
# Row 1: y=100..360, Row 2: y=290..530, Row 3: y=490..720
# ─────────────────────────────────────────────
print('IMG1 — Burgers')
W, H = 1376, 768
col_mid = W // 2  # 688

# Row 1: y ~95 to ~345 (title bar takes ~95px top)
# Row 2: y ~310 to ~550
# Row 3: y ~530 to ~760

# Left column food photos: x=10..310 approx
# Right column food photos: x=700..1000 approx

# Cheese — top-left
crop_save('img1.jpg', (10,  95, 310, 345), 'burger_cheese.jpg')
# Double Cheese — mid-left
crop_save('img1.jpg', (10, 310, 310, 550), 'burger_double_cheese.jpg')
# Chicken Burger — bottom-left
crop_save('img1.jpg', (10, 520, 310, 755), 'burger_chicken.jpg')
# Filet O'fish — top-right
crop_save('img1.jpg', (700,  95, 1000, 345), 'burger_filet.jpg')
# Star Burger — mid-right
crop_save('img1.jpg', (700, 310, 1000, 550), 'burger_star.jpg')
# Géant Burger — bottom-right
crop_save('img1.jpg', (700, 520, 1000, 755), 'burger_geant.jpg')

# ─────────────────────────────────────────────
# IMG2.JPG — Tacos / Chicken Box / Wrap / Sandwichs (1376x768)
# Top section: 3 panels roughly x=0..480, 480..900, 900..1376
# Bottom: Sandwichs grid (8 items) y~490..768
# ─────────────────────────────────────────────
print('IMG2 — Tacos / Sandwichs')

# Tacos — top-left large photo (grillé coupé), photo area right side of tacos panel
crop_save('img2.jpg', (260, 50, 500, 340), 'tacos_xl.jpg')
# Chicken Box — center top, bucket photo area
crop_save('img2.jpg', (600, 30, 900, 340), 'chicken_box.jpg')
# Wrap — top-right, photo on right side
crop_save('img2.jpg', (1060, 30, 1370, 340), 'wrap.jpg')

# Sandwichs grid — bottom section y~480..768, 8 items in 2 rows of 4
# Row 1 (y~490..630): items at x≈290,490,680,870
# Row 2 (y~630..765): items at x≈290,490,680,870
sandwich_y1_top = 480
sandwich_y1_bot = 630
sandwich_y2_top = 630
sandwich_y2_bot = 768
# Item width ~170px, spacing starts at x≈285
items_x = [290, 475, 660, 845]

names_row1 = ['sandwich_star_chicken.jpg', 'sandwich_grec.jpg', 'sandwich_americain.jpg', 'sandwich_triplex.jpg']
names_row2 = ['sandwich_tikka.jpg', 'sandwich_radical.jpg', 'sandwich_supreme.jpg', 'sandwich_royal.jpg']

for i, (x, name) in enumerate(zip(items_x, names_row1)):
    crop_save('img2.jpg', (x, sandwich_y1_top, x+170, sandwich_y1_bot), name)

for i, (x, name) in enumerate(zip(items_x, names_row2)):
    crop_save('img2.jpg', (x, sandwich_y2_top, x+170, sandwich_y2_bot), name)

# ─────────────────────────────────────────────
# IMG3.JPG — Panini/Assiettes/Tex Mex/Tenders/Desserts (1376x768)
# Left block: Panini (top), Assiettes (mid), Formule Foot (bottom)
# Right block: Chicken Wings+Nuggets (top-right), Tenders (mid-right), Desserts (bottom-right)
# ─────────────────────────────────────────────
print('IMG3 — Panini / Assiettes / Tenders / Desserts')

# Panini photo — top area, photo on right side of panini section (~x=300..680, y=0..200)
crop_save('img3.jpg', (300, 10, 700, 200), 'panini.jpg')
# Assiettes photo — mid section (~x=300..650, y=200..440)
crop_save('img3.jpg', (290, 200, 660, 440), 'assiette_grec.jpg')
# Formule Foot — 3 pizzas bottom-left (~x=0..460, y=490..768)
crop_save('img3.jpg', (50, 490, 480, 768), 'pizzas_formule.jpg')

# Chicken Wings — top-right small (~x=1100..1376, y=0..200)
crop_save('img3.jpg', (1100, 10, 1376, 200), 'chicken_wings.jpg')
# Nuggets — mid-right small (~x=1100..1376, y=200..400)
crop_save('img3.jpg', (1100, 200, 1376, 400), 'nuggets.jpg')
# Tenders — bottom-right large (~x=920..1376, y=420..768)
crop_save('img3.jpg', (920, 420, 1376, 768), 'tenders.jpg')
# Desserts — bottom-center (~x=640..950, y=490..660)
crop_save('img3.jpg', (640, 490, 980, 680), 'dessert.jpg')

# ─────────────────────────────────────────────
# IMG5.JPG — Pizzas (1376x768)
# Bottom section has 2 pizza photos side by side
# y ~520..768, x: left pizza ~50..550, right pizza ~550..1050 approx
# Actually the bottom has "Pizza La Fatale" section with photos
# ─────────────────────────────────────────────
print('IMG5 — Pizzas')
# The pizza board is mostly text. Bottom-left has a large pizza photo area
# Let's crop generously: left pizza and right pizza
crop_save('img5.jpg', (30, 490, 580, 768), 'pizza_margherita.jpg')
crop_save('img5.jpg', (580, 490, 1100, 768), 'pizza_royale.jpg')

# ─────────────────────────────────────────────
# IMG6.JPG — Salades (1377x768)
# 3 salad photos on the right side, stacked vertically
# x ~ 680..1377 for photos
# Row 1 (crevettes/avocat): y=30..280
# Row 2 (mozzarella/tomates): y=275..530
# Row 3 (chèvre chaud): y=520..768
# ─────────────────────────────────────────────
print('IMG6 — Salades')
crop_save('img6.jpg', (680, 30, 1377, 270), 'salade_crevettes.jpg')
crop_save('img6.jpg', (680, 275, 1377, 520), 'salade_mozza.jpg')
crop_save('img6.jpg', (680, 520, 1377, 768), 'salade_chevre.jpg')

print('\nAll crops done!')
print(f'Files: {sorted(os.listdir("assets/products"))}')
