/*
  Seeds MongoDB with the catalogue data (categories, designs, collections)
  originally hardcoded in the single-file HTML prototype, plus one admin user.
  Run with: npm run seed
*/
require("dotenv").config();
const connectDB = require("../config/db");
const Category = require("../models/Category");
const Design = require("../models/Design");
const Collection = require("../models/Collection");
const Admin = require("../models/Admin");

const CATEGORIES = [
  { name: "Kitchen", slug: "kitchen", image: "photo-1600489000022-c2086d79f9d4", note: "Modular, ergonomic, built to cook in", order: 1 },
  { name: "Living Room", slug: "living-room", image: "photo-1615873968403-89e068629265", note: "Where the home gathers", order: 2 },
  { name: "Master Bedroom", slug: "bedroom", image: "photo-1566665797739-1674de7a421a", note: "Quiet, layered, restful", order: 3 },
  { name: "Wardrobe", slug: "wardrobe", image: "photo-1618236444721-4a8dba415c15", note: "Storage that disappears", order: 4 },
  { name: "Bathroom", slug: "bathroom", image: "photo-1696987007764-7f8b85dd3033", note: "Stone, light and calm", order: 5 },
  { name: "Dining Room", slug: "dining", image: "photo-1617806118233-18e1de247200", note: "Designed around the table", order: 6 },
  { name: "TV Unit", slug: "tv-unit", image: "photo-1724582586508-8f06117dc979", note: "Media walls with presence", order: 7 },
  { name: "Kids Bedroom", slug: "kids-room", image: "photo-1763478958800-3a2a6321f645", note: "Playful, safe, grows with them", order: 8 },
  { name: "Home Office", slug: "home-office", image: "photo-1564540574859-0dfb63985953", note: "Focus, built in", order: 9 },
  { name: "Balcony", slug: "balcony", image: "photo-1524549207884-e7d1130ae2f3", note: "The outdoor room", order: 10 },
  { name: "Foyer", slug: "foyer", image: "photo-1704383014646-2123f9dc8137", note: "The first impression", order: 11 },
  { name: "Pooja Room", slug: "pooja-room", image: "photo-1648129027192-4e4fa2dfc90f", note: "A considered, quiet corner", order: 12 }
];

const C = {
  ivory: "#F2EDE4", beige: "#DCCDB8", sand: "#C8B49A", oak: "#C49A6C", walnut: "#6E4B33",
  charcoal: "#2B2926", olive: "#6B6A4F", terracotta: "#B4593A", sage: "#9AA78F", stone: "#B9B4AC",
  marble: "#EDEAE4", brass: "#C4A77A", teal: "#2F4F4A", forest: "#374B3A", linen: "#E4DBCB",
  slate: "#4A4E52", blush: "#D9C2B4", ink: "#1C1B19"
};

const DESIGNS = [
  { slug: "sage-contemporary-living", title: "Sage Contemporary Living", category: "Living Room", style: "Contemporary",
    img: "photo-1615529182904-14819c35db37", palette: "Muted Sage & Oak",
    colors: [["Sage", C.sage], ["Oak", C.oak], ["Ivory", C.ivory], ["Brass", C.brass]],
    materials: ["Veneered oak", "Woven cane", "Cotton linen", "Brushed brass"],
    desc: "A living room built around a single soft green wall. Low seating keeps the sightlines open, rattan pendants add a handmade note overhead, and oak veneer runs along the storage line to hold the room together.",
    gallery: ["photo-1615529182904-14819c35db37", "photo-1583847268964-b28dc8f51f92", "photo-1556228453-efd6c1ff04f6", "photo-1616486338812-3dadae4b4ace"], featured: false, trending: false, editorsPick: true },

  { slug: "teal-gallery-living-room", title: "Teal Gallery Living Room", category: "Living Room", style: "Modern",
    img: "photo-1615873968403-89e068629265", palette: "Deep Teal & Tan",
    colors: [["Teal", C.teal], ["Tan Leather", C.oak], ["Ivory", C.ivory], ["Charcoal", C.charcoal]],
    materials: ["Full-grain leather", "Painted MDF", "Oak flooring", "Blackened steel"],
    desc: "Deep teal gives the sofa wall its weight; a tight grid of framed prints does the rest. Tan leather warms the palette, and planting at either end softens the geometry without crowding the floor.",
    gallery: ["photo-1615873968403-89e068629265", "photo-1600210492486-724fe5c67fb0", "photo-1618221195710-dd6b41faaea6", "photo-1502672260266-1c1ef2d93688"], trending: true },

  { slug: "warm-minimal-living", title: "Warm Minimal Living", category: "Living Room", style: "Minimal",
    img: "photo-1618221195710-dd6b41faaea6", palette: "Warm Neutrals",
    colors: [["Sand", C.sand], ["Walnut", C.walnut], ["Linen", C.linen], ["Stone", C.stone]],
    materials: ["Walnut", "Boucle", "Wool rug", "Travertine"],
    desc: "Restraint, not emptiness. A pair of leather ottomans replaces the coffee table so the floor stays flexible, and every surface sits within two tones of the wall colour.",
    gallery: ["photo-1618221195710-dd6b41faaea6", "photo-1616486338812-3dadae4b4ace", "photo-1600121848594-d8644e57abab", "photo-1513694203232-719a280e022f"] },

  { slug: "ivory-sectional-lounge", title: "Ivory Sectional Lounge", category: "Living Room", style: "Classic",
    img: "photo-1616486338812-3dadae4b4ace", palette: "Ivory & Bone",
    colors: [["Ivory", C.ivory], ["Bone", C.beige], ["Stone", C.stone], ["Brass", C.brass]],
    materials: ["Performance cotton", "Marble", "Antique brass", "Plaster finish"],
    desc: "A generous ivory sectional anchors a high-ceilinged room. Curved silhouettes and a plaster wall finish keep a large volume feeling soft rather than formal.",
    gallery: ["photo-1616486338812-3dadae4b4ace", "photo-1600210492493-0946911123ea", "photo-1571624436279-b272aff752b5", "photo-1618221195710-dd6b41faaea6"] },

  { slug: "macrame-boho-living", title: "Macramé Boho Living", category: "Living Room", style: "Indian",
    img: "photo-1556228453-efd6c1ff04f6", palette: "Terracotta & Jute",
    colors: [["Terracotta", C.terracotta], ["Jute", C.sand], ["Ivory", C.ivory], ["Walnut", C.walnut]],
    materials: ["Jute", "Cane", "Handloom cotton", "Solid teak"],
    desc: "Handmade texture doing the decorating. A macramé panel, a jute floor and a low teak table give the room its Indian craft register while the palette stays quiet.",
    gallery: ["photo-1556228453-efd6c1ff04f6", "photo-1513694203232-719a280e022f", "photo-1631679706909-1844bbd07221", "photo-1502672260266-1c1ef2d93688"] },

  { slug: "mint-editorial-living", title: "Mint Editorial Living", category: "Living Room", style: "Scandinavian",
    img: "photo-1583847268964-b28dc8f51f92", palette: "Mint & Ash",
    colors: [["Mint", C.sage], ["Ash", C.stone], ["Ivory", C.ivory], ["Oak", C.oak]],
    materials: ["Ash wood", "Wool", "Jute stools", "Matte lacquer"],
    desc: "Pale mint walls, a rounded sofa and two carved stools instead of a table. Nordic proportions adapted for an apartment living room that needs to seat six without feeling full.",
    gallery: ["photo-1583847268964-b28dc8f51f92", "photo-1615529182904-14819c35db37", "photo-1600607687939-ce8a6c25118c", "photo-1571624436279-b272aff752b5"] },

  { slug: "olive-reading-corner", title: "Olive Reading Corner", category: "Living Room", style: "Modern",
    img: "photo-1586023492125-27b2c045efd7", palette: "Olive & Ochre",
    colors: [["Olive", C.olive], ["Ochre", C.brass], ["Walnut", C.walnut], ["Ivory", C.ivory]],
    materials: ["Painted panelling", "Bouclé upholstery", "Oak floor", "Powder-coated steel"],
    desc: "A corner given a job. Deep olive panelling frames a single upholstered chair and a slim floor lamp — proof that a good room does not need to be a big one.",
    gallery: ["photo-1586023492125-27b2c045efd7", "photo-1558211583-d26f610c1eb1", "photo-1600121848594-d8644e57abab", "photo-1502672260266-1c1ef2d93688"] },

  { slug: "timber-ceiling-lounge", title: "Timber Ceiling Lounge", category: "Living Room", style: "Japandi",
    img: "photo-1600210492493-0946911123ea", palette: "Timber & Paper",
    colors: [["Cedar", C.oak], ["Paper", C.ivory], ["Charcoal", C.charcoal], ["Sand", C.sand]],
    materials: ["Cedar ceiling", "Rice-paper shades", "Cane", "Concrete floor"],
    desc: "A slatted timber ceiling carries the eye to the garden. Furniture stays low and grounded so the architecture, not the styling, is the loudest thing in the room.",
    gallery: ["photo-1600210492493-0946911123ea", "photo-1616486338812-3dadae4b4ace", "photo-1615529182904-14819c35db37", "photo-1600607687939-ce8a6c25118c"], editorsPick: true },

  { slug: "open-plan-daylight-living", title: "Open Plan Daylight Living", category: "Living Room", style: "Contemporary",
    img: "photo-1600607687939-ce8a6c25118c", palette: "Cloud & Graphite",
    colors: [["Cloud", C.marble], ["Graphite", C.slate], ["Oak", C.oak], ["Ivory", C.ivory]],
    materials: ["Engineered oak", "Matte laminate", "Wool blend", "Glass"],
    desc: "One volume, three functions. A low console divides lounge from dining without a wall, and a single continuous floor tone keeps a long open plan reading as one space.",
    gallery: ["photo-1600607687939-ce8a6c25118c", "photo-1560448204-e02f11c3d0e2", "photo-1600121848594-d8644e57abab", "photo-1600566753086-00f18fb6b3ea"] },

  { slug: "forest-green-modular-kitchen", title: "Forest Green Modular Kitchen", category: "Kitchen", style: "Modern",
    img: "photo-1600489000022-c2086d79f9d4", palette: "Forest & Quartz",
    colors: [["Forest", C.forest], ["Quartz", C.marble], ["Oak", C.oak], ["Graphite", C.slate]],
    materials: ["Matte-lacquer shutters", "Engineered quartz", "Oak open shelving", "Soft-close hardware"],
    desc: "Deep green base units grounded by a pale quartz counter, with open oak shelving for everyday pieces. A working triangle sized for two cooks, not for a photograph.",
    gallery: ["photo-1600489000022-c2086d79f9d4", "photo-1556911220-bff31c812dba", "photo-1600585152220-90363fe7e115", "photo-1484154218962-a197022b5858"], trending: true },

  { slug: "marble-island-kitchen", title: "Marble Island Kitchen", category: "Kitchen", style: "Luxury",
    img: "photo-1556911220-bff31c812dba", palette: "Marble & Ivory",
    colors: [["Marble", C.marble], ["Ivory", C.ivory], ["Brass", C.brass], ["Charcoal", C.charcoal]],
    materials: ["Natural marble", "Handleless fronts", "Brass fittings", "Integrated appliances"],
    desc: "A full-height marble run with a veined island at its centre. Handleless fronts keep the stone as the only pattern in the room.",
    gallery: ["photo-1556911220-bff31c812dba", "photo-1484154218962-a197022b5858", "photo-1600585152220-90363fe7e115", "photo-1507089947368-19c1da9775ae"] },

  { slug: "oak-and-white-kitchen", title: "Oak & White Modular Kitchen", category: "Kitchen", style: "Scandinavian",
    img: "photo-1600585152220-90363fe7e115", palette: "Oak & Chalk",
    colors: [["Oak", C.oak], ["Chalk", C.ivory], ["Sand", C.sand], ["Ink", C.ink]],
    materials: ["Oak veneer", "Chalk-matte laminate", "Solid-surface top", "Black pendants"],
    desc: "A breakfast island in solid oak with four stools, built for the half of the day when the kitchen is really a dining room.",
    gallery: ["photo-1600585152220-90363fe7e115", "photo-1507089947368-19c1da9775ae", "photo-1556911220-bff31c812dba", "photo-1600489000022-c2086d79f9d4"] },

  { slug: "monochrome-galley-kitchen", title: "Monochrome Galley Kitchen", category: "Kitchen", style: "Minimal",
    img: "photo-1484154218962-a197022b5858", palette: "Black & White",
    colors: [["Ink", C.ink], ["Chalk", C.ivory], ["Steel", C.stone], ["Walnut", C.walnut]],
    materials: ["Matte black laminate", "Ceramic tile", "Stainless steel", "Walnut trim"],
    desc: "A tight galley made generous by contrast: dark lowers, white uppers, and every appliance flush with the run so nothing interrupts the line.",
    gallery: ["photo-1484154218962-a197022b5858", "photo-1600489000022-c2086d79f9d4", "photo-1507089947368-19c1da9775ae", "photo-1556911220-bff31c812dba"] },

  { slug: "pendant-lit-kitchen", title: "Pendant-Lit Family Kitchen", category: "Kitchen", style: "Classic",
    img: "photo-1507089947368-19c1da9775ae", palette: "Warm White",
    colors: [["Warm White", C.ivory], ["Brass", C.brass], ["Stone", C.stone], ["Oak", C.oak]],
    materials: ["Shaker fronts", "Quartz counter", "Glass pendants", "Brushed brass"],
    desc: "Shaker fronts and three glass pendants over a long island. A classic layout detailed carefully enough to stay out of date's way.",
    gallery: ["photo-1507089947368-19c1da9775ae", "photo-1600585152220-90363fe7e115", "photo-1556911220-bff31c812dba", "photo-1484154218962-a197022b5858"] },

  { slug: "fluted-walnut-bedroom", title: "Fluted Walnut Master Bedroom", category: "Master Bedroom", style: "Luxury",
    img: "photo-1566665797739-1674de7a421a", palette: "Walnut & Teal",
    colors: [["Walnut", C.walnut], ["Teal", C.teal], ["Ivory", C.ivory], ["Brass", C.brass]],
    materials: ["Fluted walnut", "Velvet", "Brass sconces", "Wool carpet"],
    desc: "A fluted walnut headboard wall wrapping the full width of the room, with reading sconces set into it. Warm, enclosing, and quiet at night.",
    gallery: ["photo-1566665797739-1674de7a421a", "photo-1617104678098-de229db51175", "photo-1616627561950-9f746e330187", "photo-1631049307264-da0ec9d70304"], trending: true },

  { slug: "charcoal-luxe-bedroom", title: "Charcoal Luxe Bedroom", category: "Master Bedroom", style: "Contemporary",
    img: "photo-1617104678098-de229db51175", palette: "Charcoal & Bronze",
    colors: [["Charcoal", C.charcoal], ["Bronze", C.brass], ["Linen", C.linen], ["Slate", C.slate]],
    materials: ["Textured plaster", "Linen bedding", "Bronze hardware", "Blackout drapery"],
    desc: "A dark accent wall in textured plaster, layered bedding in three shades of the same neutral, and full-height drapery to soften the glazing.",
    gallery: ["photo-1617104678098-de229db51175", "photo-1566665797739-1674de7a421a", "photo-1600607687644-c7171b42498f", "photo-1616594039964-ae9021a400a0"] },

  { slug: "ivory-calm-bedroom", title: "Ivory Calm Bedroom", category: "Master Bedroom", style: "Japandi",
    img: "photo-1586105251261-72a756497a11", palette: "Ivory & Ash",
    colors: [["Ivory", C.ivory], ["Ash", C.stone], ["Ink", C.ink], ["Brass", C.brass]],
    materials: ["Lime wash", "Ash veneer", "Brass wall light", "Cotton"],
    desc: "Two line drawings, one wall light, a low bed. Everything else edited out — the Japandi idea taken seriously rather than decoratively.",
    gallery: ["photo-1586105251261-72a756497a11", "photo-1600607687644-c7171b42498f", "photo-1595526114035-0d45ed16cfbf", "photo-1616627561950-9f746e330187"], editorsPick: true },

  { slug: "soft-grey-guest-bedroom", title: "Soft Grey Guest Bedroom", category: "Master Bedroom", style: "Minimal",
    img: "photo-1600607687644-c7171b42498f", palette: "Grey & Chalk",
    colors: [["Grey", C.stone], ["Chalk", C.ivory], ["Slate", C.slate], ["Oak", C.oak]],
    materials: ["Upholstered headboard", "Cotton percale", "Oak nightstand", "Sheer curtain"],
    desc: "A compact guest room that reads generous: a wall-width headboard, matched bedside lighting and nothing at floor level to trip over.",
    gallery: ["photo-1600607687644-c7171b42498f", "photo-1631049307264-da0ec9d70304", "photo-1586105251261-72a756497a11", "photo-1595526114035-0d45ed16cfbf"] },

  { slug: "hotel-style-master-bedroom", title: "Hotel-Style Master Bedroom", category: "Master Bedroom", style: "Modern",
    img: "photo-1631049307264-da0ec9d70304", palette: "Greige & Bronze",
    colors: [["Greige", C.beige], ["Bronze", C.brass], ["Charcoal", C.charcoal], ["Ivory", C.ivory]],
    materials: ["Panelled headboard", "Layered drapery", "Wool runner", "Recessed lighting"],
    desc: "Hotel discipline at home — symmetrical bedsides, a panelled headboard, and a lighting layout that can go from full brightness to a single low glow.",
    gallery: ["photo-1631049307264-da0ec9d70304", "photo-1617104678098-de229db51175", "photo-1600607687644-c7171b42498f", "photo-1566665797739-1674de7a421a"] },

  { slug: "linen-layers-bedroom", title: "Linen Layers Bedroom", category: "Master Bedroom", style: "Scandinavian",
    img: "photo-1616627561950-9f746e330187", palette: "Linen & Cocoa",
    colors: [["Linen", C.linen], ["Cocoa", C.walnut], ["Sand", C.sand], ["Ivory", C.ivory]],
    materials: ["Washed linen", "Cotton stripe", "Oak bed frame", "Wool throw"],
    desc: "The whole scheme decided at pillow level: washed linen, a cocoa stripe, and a single oak frame underneath it all.",
    gallery: ["photo-1616627561950-9f746e330187", "photo-1595526114035-0d45ed16cfbf", "photo-1586105251261-72a756497a11", "photo-1540518614846-7eded433c457"] },

  { slug: "marble-brass-bathroom", title: "Marble & Brass Bathroom", category: "Bathroom", style: "Luxury",
    img: "photo-1696987007764-7f8b85dd3033", palette: "Marble & Brass",
    colors: [["Marble", C.marble], ["Brass", C.brass], ["Ivory", C.ivory], ["Stone", C.stone]],
    materials: ["Book-matched marble", "Brass fittings", "Vessel basin", "Backlit mirror"],
    desc: "Book-matched marble behind a single vessel basin, with an arched brass-framed mirror centred on the veining. One gesture, done properly.",
    gallery: ["photo-1696987007764-7f8b85dd3033", "photo-1600607688066-890987f18a86", "photo-1638799869566-b17fa794c4de", "photo-1604709177225-055f99402ea3"], trending: true },

  { slug: "stone-spa-bathroom", title: "Stone Spa Bathroom", category: "Bathroom", style: "Contemporary",
    img: "photo-1638799869566-b17fa794c4de", palette: "Stone & Smoke",
    colors: [["Stone", C.stone], ["Smoke", C.slate], ["Walnut", C.walnut], ["Ivory", C.ivory]],
    materials: ["Large-format porcelain", "Walnut vanity", "Frameless glass", "Matte black fittings"],
    desc: "A wet zone in large-format porcelain with a walnut vanity floating clear of the floor — easy to clean under, and visually lighter in a narrow room.",
    gallery: ["photo-1638799869566-b17fa794c4de", "photo-1572742482459-e04d6cfdd6f3", "photo-1600607688066-890987f18a86", "photo-1696987007764-7f8b85dd3033"], editorsPick: true },

  { slug: "walnut-vanity-bathroom", title: "Walnut Vanity Bathroom", category: "Bathroom", style: "Modern",
    img: "photo-1600607688066-890987f18a86", palette: "Walnut & Chalk",
    colors: [["Walnut", C.walnut], ["Chalk", C.ivory], ["Graphite", C.slate], ["Marble", C.marble]],
    materials: ["Walnut veneer", "Solid-surface top", "Twin mirrors", "Concealed cistern"],
    desc: "A twin-basin walnut vanity with mirrors lit from behind. Storage sized for two people who leave the house at the same time.",
    gallery: ["photo-1600607688066-890987f18a86", "photo-1604709177225-055f99402ea3", "photo-1696987007764-7f8b85dd3033", "photo-1552321554-5fefe8c9ef14"] },

  { slug: "botanical-white-bathroom", title: "Botanical White Bathroom", category: "Bathroom", style: "Classic",
    img: "photo-1552321554-5fefe8c9ef14", palette: "White & Green",
    colors: [["Chalk", C.ivory], ["Fern", C.sage], ["Stone", C.stone], ["Brass", C.brass]],
    materials: ["Beadboard panelling", "Pedestal basin", "Terrazzo floor", "Trailing planting"],
    desc: "Panelled white walls kept from feeling clinical by planting at three heights and a warm terrazzo underfoot.",
    gallery: ["photo-1552321554-5fefe8c9ef14", "photo-1604709177225-055f99402ea3", "photo-1696987007764-7f8b85dd3033", "photo-1600607688066-890987f18a86"] },

  { slug: "emerald-velvet-dining", title: "Emerald Velvet Dining", category: "Dining Room", style: "Luxury",
    img: "photo-1617806118233-18e1de247200", palette: "Emerald & Brass",
    colors: [["Emerald", C.forest], ["Brass", C.brass], ["Ivory", C.ivory], ["Walnut", C.walnut]],
    materials: ["Velvet upholstery", "Brass legs", "Arched mirror", "Marble top"],
    desc: "Six emerald velvet chairs around a marble top, with an arched mirror doubling the light from a single window. Formal without being stiff.",
    gallery: ["photo-1617806118233-18e1de247200", "photo-1611596188718-840151555242", "photo-1745794621090-d856c53b0cc2", "photo-1604578762246-41134e37f9cc"], featured: true },

  { slug: "garden-view-dining", title: "Garden View Dining", category: "Dining Room", style: "Contemporary",
    img: "photo-1604578762246-41134e37f9cc", palette: "Timber & Leaf",
    colors: [["Timber", C.oak], ["Leaf", C.sage], ["Ivory", C.ivory], ["Copper", C.terracotta]],
    materials: ["Solid teak table", "Copper pendant", "Glass sliders", "Stone floor"],
    desc: "A long teak table set parallel to the garden doors, lit by one copper pendant so the view stays the brightest thing in the room after dark.",
    gallery: ["photo-1604578762246-41134e37f9cc", "photo-1723750290151-164cb19ebab7", "photo-1560185007-cde436f6a4d0", "photo-1617806118233-18e1de247200"] },

  { slug: "sculpted-oak-dining", title: "Sculpted Oak Dining", category: "Dining Room", style: "Minimal",
    img: "photo-1723750290151-164cb19ebab7", palette: "Oak & Ink",
    colors: [["Oak", C.oak], ["Ink", C.ink], ["Chalk", C.ivory], ["Stone", C.stone]],
    materials: ["Sculpted oak base", "Matte-black chairs", "Linen blind", "Plaster wall"],
    desc: "A heavy sculpted base under a light top, matte-black chairs for contrast, and nothing else in the room but a blind.",
    gallery: ["photo-1723750290151-164cb19ebab7", "photo-1745794621090-d856c53b0cc2", "photo-1611596188718-840151555242", "photo-1560185007-cde436f6a4d0"], editorsPick: true },

  { slug: "mid-century-dining", title: "Mid-Century Dining", category: "Dining Room", style: "Classic",
    img: "photo-1745794621090-d856c53b0cc2", palette: "Teak & Cream",
    colors: [["Teak", C.walnut], ["Cream", C.ivory], ["Olive", C.olive], ["Brass", C.brass]],
    materials: ["Teak round table", "Spindle chairs", "Wool rug", "Ceramic accents"],
    desc: "A round teak table for a room that needs to seat five without corners. Spindle-back chairs keep the sightline through to the window open.",
    gallery: ["photo-1745794621090-d856c53b0cc2", "photo-1611596188718-840151555242", "photo-1723750290151-164cb19ebab7", "photo-1604578762246-41134e37f9cc"] },

  { slug: "oak-walk-in-wardrobe", title: "Oak Walk-In Wardrobe", category: "Wardrobe", style: "Luxury",
    img: "photo-1618236444721-4a8dba415c15", palette: "Oak & Ivory",
    colors: [["Oak", C.oak], ["Ivory", C.ivory], ["Brass", C.brass], ["Linen", C.linen]],
    materials: ["Oak carcass", "Glass-front modules", "LED profile lighting", "Soft-close drawers"],
    desc: "An open wardrobe treated like joinery, not storage: glass fronts, lit shelves, and a drawer stack sized to what is actually owned.",
    gallery: ["photo-1618236444721-4a8dba415c15", "photo-1774301211236-dab64d553241", "photo-1595428774223-ef52624120d2", "photo-1629078691371-2c83d139c986"], trending: true },

  { slug: "backlit-dressing-room", title: "Backlit Dressing Room", category: "Wardrobe", style: "Modern",
    img: "photo-1774301211236-dab64d553241", palette: "Graphite & Glow",
    colors: [["Graphite", C.slate], ["Glow", C.brass], ["Ivory", C.ivory], ["Charcoal", C.charcoal]],
    materials: ["Fluted panels", "Backlit mirror", "Stone counter", "Integrated LED"],
    desc: "A dressing bay carved out of the bedroom — mirror, counter and a seat, lit warm enough to actually get ready in.",
    gallery: ["photo-1774301211236-dab64d553241", "photo-1618236444721-4a8dba415c15", "photo-1629078691371-2c83d139c986", "photo-1595428774223-ef52624120d2"] },

  { slug: "floor-to-ceiling-wardrobe", title: "Floor-to-Ceiling Wardrobe", category: "Wardrobe", style: "Minimal",
    img: "photo-1595428774223-ef52624120d2", palette: "Pale Timber",
    colors: [["Pale Timber", C.sand], ["Chalk", C.ivory], ["Stone", C.stone], ["Ink", C.ink]],
    materials: ["Handleless shutters", "Adjustable shelving", "Anti-dust seals", "Matte laminate"],
    desc: "Full-height, handleless, flush to the wall line. Storage that takes the room's height instead of its floor.",
    gallery: ["photo-1595428774223-ef52624120d2", "photo-1629078691371-2c83d139c986", "photo-1618236444721-4a8dba415c15", "photo-1774301211236-dab64d553241"] },

  { slug: "fluted-charcoal-tv-wall", title: "Fluted Charcoal TV Wall", category: "TV Unit", style: "Modern",
    img: "photo-1724582586508-8f06117dc979", palette: "Charcoal & Warm Glow",
    colors: [["Charcoal", C.charcoal], ["Warm Glow", C.brass], ["Ink", C.ink], ["Stone", C.stone]],
    materials: ["Fluted MDF", "Concealed LED", "Matte lacquer", "Stone plinth"],
    desc: "A fluted charcoal wall with the screen recessed flush into it and a warm LED wash at the edges — so the television reads as part of the wall when it's off.",
    gallery: ["photo-1724582586508-8f06117dc979", "photo-1663811397219-c572550dffc5", "photo-1667510436110-79d3dabc2008", "photo-1738168259543-d0c58e2b91ed"], trending: true },

  { slug: "backlit-media-wall", title: "Backlit Media Wall", category: "TV Unit", style: "Industrial",
    img: "photo-1663811397219-c572550dffc5", palette: "Graphite & Amber",
    colors: [["Graphite", C.slate], ["Amber", C.brass], ["Ink", C.ink], ["Walnut", C.walnut]],
    materials: ["Dark veneer", "Backlit niches", "Blackened steel", "Concealed storage"],
    desc: "Open niches lit from within break up a long dark run, giving the wall depth without adding clutter to it.",
    gallery: ["photo-1663811397219-c572550dffc5", "photo-1724582586508-8f06117dc979", "photo-1738168259543-d0c58e2b91ed", "photo-1667510436110-79d3dabc2008"] },

  { slug: "warm-oak-tv-console", title: "Warm Oak TV Console", category: "TV Unit", style: "Scandinavian",
    img: "photo-1738168259543-d0c58e2b91ed", palette: "Oak & Chalk",
    colors: [["Oak", C.oak], ["Chalk", C.ivory], ["Sand", C.sand], ["Slate", C.slate]],
    materials: ["Oak slats", "Floating console", "Cable management", "Acoustic felt"],
    desc: "A slatted oak panel with a floating console beneath it. Cables routed inside the wall, so the only thing on show is the timber.",
    gallery: ["photo-1738168259543-d0c58e2b91ed", "photo-1667510436110-79d3dabc2008", "photo-1724582586508-8f06117dc979", "photo-1663811397219-c572550dffc5"] },

  { slug: "canopy-kids-bedroom", title: "Canopy Kids Bedroom", category: "Kids Bedroom", style: "Scandinavian",
    img: "photo-1763478958800-3a2a6321f645", palette: "Blush & Oat",
    colors: [["Blush", C.blush], ["Oat", C.linen], ["Oak", C.oak], ["Ivory", C.ivory]],
    materials: ["Cotton canopy", "Rounded oak edges", "Washable rug", "Low open storage"],
    desc: "A canopy over the bed, storage low enough to reach, and every corner rounded. Designed to be rearranged as they grow, not replaced.",
    gallery: ["photo-1763478958800-3a2a6321f645", "photo-1600493504483-8df7098b5792", "photo-1600493505500-afac3fc363e6", "photo-1557124816-e9b7d5440de2"], editorsPick: true },

  { slug: "storybook-nursery", title: "Storybook Nursery", category: "Kids Bedroom", style: "Classic",
    img: "photo-1600493504483-8df7098b5792", palette: "Mural & Cream",
    colors: [["Mural Grey", C.stone], ["Cream", C.ivory], ["Sage", C.sage], ["Oak", C.oak]],
    materials: ["Hand-drawn mural", "Convertible cot", "Blackout blind", "Low-VOC paint"],
    desc: "A hand-drawn tree mural, a convertible cot and a blackout blind — the three decisions that matter most in a nursery.",
    gallery: ["photo-1600493504483-8df7098b5792", "photo-1763478958800-3a2a6321f645", "photo-1557124816-e9b7d5440de2", "photo-1600493505500-afac3fc363e6"] },

  { slug: "charcoal-home-office", title: "Charcoal Home Office", category: "Home Office", style: "Modern",
    img: "photo-1564540574859-0dfb63985953", palette: "Charcoal & Brass",
    colors: [["Charcoal", C.charcoal], ["Brass", C.brass], ["Ivory", C.ivory], ["Walnut", C.walnut]],
    materials: ["Matte dark paint", "Solid desk top", "Task lighting", "Acoustic panel"],
    desc: "A dark room used deliberately — low reflectance behind the screen, one good task light, and a wall of framed work for the days it's needed.",
    gallery: ["photo-1564540574859-0dfb63985953", "photo-1611817084000-13da78818a0f", "photo-1493809842364-78817add7ffb", "photo-1613685303404-19f881533316"] },

  { slug: "library-study", title: "Library Study", category: "Home Office", style: "Classic",
    img: "photo-1611817084000-13da78818a0f", palette: "Leather & Walnut",
    colors: [["Leather", C.terracotta], ["Walnut", C.walnut], ["Cream", C.ivory], ["Olive", C.olive]],
    materials: ["Open shelving", "Leather armchair", "Wool rug", "Brass picture light"],
    desc: "Full-height shelving on the long wall and a single armchair facing it. A study that expects to be read in as much as worked in.",
    gallery: ["photo-1611817084000-13da78818a0f", "photo-1564540574859-0dfb63985953", "photo-1613685303404-19f881533316", "photo-1493809842364-78817add7ffb"] },

  { slug: "bright-study-nook", title: "Bright Study Nook", category: "Home Office", style: "Minimal",
    img: "photo-1493809842364-78817add7ffb", palette: "Chalk & Timber",
    colors: [["Chalk", C.ivory], ["Timber", C.oak], ["Sage", C.sage], ["Stone", C.stone]],
    materials: ["Wall-hung desk", "Cable channel", "Pinboard", "Cane chair"],
    desc: "A wall-hung desk in the brightest corner of the flat. Forty centimetres of depth, and the floor left clear underneath it.",
    gallery: ["photo-1493809842364-78817add7ffb", "photo-1613685303404-19f881533316", "photo-1611817084000-13da78818a0f", "photo-1564540574859-0dfb63985953"] },

  { slug: "rooftop-balcony-lounge", title: "Rooftop Balcony Lounge", category: "Balcony", style: "Contemporary",
    img: "photo-1524549207884-e7d1130ae2f3", palette: "Charcoal & Ember",
    colors: [["Charcoal", C.charcoal], ["Ember", C.terracotta], ["Jute", C.sand], ["Olive", C.olive]],
    materials: ["Weatherproof seating", "Deck tiles", "Festoon lighting", "Planter wall"],
    desc: "An open terrace turned into a room: a deep corner sofa, a planted edge for privacy, and festoon lighting so it works best after sunset.",
    gallery: ["photo-1524549207884-e7d1130ae2f3", "photo-1600776216872-b39b2a3dd995", "photo-1658048806266-f793f1f8c7c6", "photo-1556228453-efd6c1ff04f6"], trending: true },

  { slug: "morning-light-balcony", title: "Morning Light Balcony", category: "Balcony", style: "Minimal",
    img: "photo-1600776216872-b39b2a3dd995", palette: "Timber & Sky",
    colors: [["Timber", C.oak], ["Sky", C.stone], ["Chalk", C.ivory], ["Sage", C.sage]],
    materials: ["Folding timber chair", "Slim rail planter", "Outdoor rug", "Teak decking"],
    desc: "Two square metres, used properly. A folding chair, a rail planter and a warm deck underfoot — enough for the first coffee of the day.",
    gallery: ["photo-1600776216872-b39b2a3dd995", "photo-1524549207884-e7d1130ae2f3", "photo-1658048806266-f793f1f8c7c6", "photo-1552321554-5fefe8c9ef14"] },

  { slug: "mirror-console-foyer", title: "Mirror & Console Foyer", category: "Foyer", style: "Contemporary",
    img: "photo-1704383014646-2123f9dc8137", palette: "Warm Neutral",
    colors: [["Warm Neutral", C.beige], ["Brass", C.brass], ["Walnut", C.walnut], ["Ivory", C.ivory]],
    materials: ["Sunburst mirror", "Slim console", "Runner rug", "Dark timber floor"],
    desc: "A narrow entrance given one strong gesture — a sunburst mirror above a slim console — and a runner to carry you through it.",
    gallery: ["photo-1704383014646-2123f9dc8137", "photo-1771918521584-92009971f0d3", "photo-1648129027192-4e4fa2dfc90f", "photo-1497366754035-f200968a6e72"] },

  { slug: "arched-entrance-foyer", title: "Arched Entrance Foyer", category: "Foyer", style: "Indian",
    img: "photo-1771918521584-92009971f0d3", palette: "Ochre & Timber",
    colors: [["Ochre", C.brass], ["Timber", C.walnut], ["Sand", C.sand], ["Ivory", C.ivory]],
    materials: ["Plastered arch", "Timber doors", "Stone flooring", "Warm cove lighting"],
    desc: "A plastered arch framing the passage, warm cove lighting above, and a pair of chairs where shoes actually get taken off.",
    gallery: ["photo-1771918521584-92009971f0d3", "photo-1704383014646-2123f9dc8137", "photo-1648129027192-4e4fa2dfc90f", "photo-1497366754035-f200968a6e72"], editorsPick: true },

  { slug: "niche-pooja-corner", title: "Niche Pooja Corner", category: "Pooja Room", style: "Indian",
    img: "photo-1648129027192-4e4fa2dfc90f", palette: "Ochre & Stone",
    colors: [["Ochre", C.brass], ["Stone", C.stone], ["Terracotta", C.terracotta], ["Sage", C.sage]],
    materials: ["Stone shelf", "Carved timber", "Warm niche lighting", "Brass vessels"],
    desc: "A quiet corner rather than a separate room — a stone shelf set into an ochre niche, lit warm, with storage for vessels below.",
    gallery: ["photo-1648129027192-4e4fa2dfc90f", "photo-1771918521584-92009971f0d3", "photo-1704383014646-2123f9dc8137", "photo-1616628188540-925618b98318"] }
];

const COLLECTIONS = [
  { key: "warm-earthy", label: "Warm & Earthy", img: "photo-1618221195710-dd6b41faaea6", cat: "Living Room", style: "Minimal",
    text: "Natural materials, warm wood and a narrow band of neutrals — rooms that feel lived in from the first day.",
    tags: ["Natural materials", "Warm wood", "Neutral colours"], order: 1 },
  { key: "modern-minimal", label: "Modern Minimal", img: "photo-1586105251261-72a756497a11", cat: "Master Bedroom", style: "Japandi",
    text: "Clean lines and soft neutrals, with storage planned so carefully that most of it is invisible.",
    tags: ["Clean lines", "Soft neutrals", "Functional storage"], order: 2 },
  { key: "timeless-luxury", label: "Timeless Luxury", img: "photo-1696987007764-7f8b85dd3033", cat: "Bathroom", style: "Luxury",
    text: "Rich textures, considered lighting and premium finishes used sparingly enough to last a decade.",
    tags: ["Rich textures", "Elegant lighting", "Premium finishes"], order: 3 }
];

function toColorArray(pairs) {
  return pairs.map(([name, hex]) => ({ name, hex }));
}

async function run() {
  await connectDB();

  await Promise.all([Category.deleteMany({}), Design.deleteMany({}), Collection.deleteMany({})]);

  await Category.insertMany(CATEGORIES);
  await Design.insertMany(
    DESIGNS.map((d, i) => ({ ...d, colors: toColorArray(d.colors), order: i + 1 }))
  );
  await Collection.insertMany(COLLECTIONS);

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@rishihomeinterior.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const existing = await Admin.findOne({ email: adminEmail });
  if (!existing) {
    await Admin.create({ email: adminEmail, password: adminPassword, name: "Studio Admin" });
    console.log("Admin user created:", adminEmail);
  } else {
    console.log("Admin user already exists:", adminEmail);
  }

  console.log(`Seeded ${CATEGORIES.length} categories, ${DESIGNS.length} designs, ${COLLECTIONS.length} collections.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
