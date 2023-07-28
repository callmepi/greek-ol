# greek-ol

(ελ) CSS και Javascript εργαλεία για Ελληνική αρίθμηση σε <ol> HTML blocks
(eng) CSS ruleset and JS module for Greek/Ionic/Alexandrian numbered <ol> list block



## Greek numerals

[or Ionic or Ionian or Alexandrian numerals](https://en.wikipedia.org/wiki/Greek_numerals),
are a system of writing numbers
using the letters of the Greek alphabet. Although the system is not used
in greek mathematics anymore, it does exist for ordered-lists in Greek texts.

No browser supports this numeral system inherently;  
that's what this library is for.

**NOTE**:   
Although the library can generate all CSS rules needed for ordered lists
up to 999.999 greek-numbered items _it is not recomended to create huge lists_.
Usually, a list up to several decades or a few hundrends is pretty enough.



## Installation and use

The project is under development; Still it is a minimum viable product.

You can use the CSS rules directry ```(css/*)``` or customize the output
using the javascript module (js/generate-gr-ol.js).


### Just use the CSS

* download the code and copy ```css/*``` files to your css|assets folder
* link the CSS files onto your html document
* In the order-list where you want to use the Greek numbering, set
    * ```list-style-type: lower-greek;``` or
    * ```list-style-type: upper-greek;```


### Customize via the Javascript generator

(in progress)...

