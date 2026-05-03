# Code Citations

## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```


## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```


## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```


## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```


## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```


## License: unknown
https://github.com/r-OdishaModerator/r-OdishaWebsite/blob/5ea82bac0b6469af0c0c928cc54b99c72b38dd9f/src/index.css

```
**Ah, tools disabled!** Baik, saya jelaskan solusinya: 

## **Root Cause:**
Di [src/index.css](src/index.css) ada CSS rules hardcoded yang **override Tailwind** utility classes:

```css
h1 { color: var(--dark); }      /* ← ini yang bikin text jadi hitam! */
h2 { color: var(--dark); }
h3 { color: var(--dark); }
```

Saat Anda pakai `class="text-white"` di component, CSS rule ini **override-nya** karena lebih spesifik.

---

## **Fix - Replace seluruh [src/index.css](src/index.css):**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-poppins;
```

