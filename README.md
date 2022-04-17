										       Terminalisok
==================================================================================================
Dummyjson -> Object									| LeftBrace -> { 
Object -> LeftBrace Members RightBrace				              | RightBrace -> }
Members -> Member									| Comma -> ,
         | Member Comma Members						       | Colon -> :
Member -> Str Colon Element							       | StrSign -> "
                                                                             | Zero -> 0
Element -> Str									| Onenine -> <1-9>
         | Int									| Char -> <Aa-Zz,0-9...any>
	  | Object								       | 
Str -> StrSign Chars StrSign						       |
Chars -> Char										|
       | Char Chars									|
Int -> Digit										|
     | Onenine Digits								|
Digits -> Digit									|
        | Digit Digits								|
Digit -> Zero										|
       | Onenine									|

===================================================================================================
First(Onenine): { <1-9> }
First(Char): { <Aa-Zz, 0-9...any> }
First(Chars): First(Char)
First(Digit): { 0, First(Onenine) }
First(Digits): First(Digit)
First(Int): First(Onenine)
First(Str): { " }
First(Object): { '{' }
First(Element): { First(Str), First(Int), First(Object) }
First(Member): First(Str)
First(Members): First(Str)
First(Dummyjson): First(Object)
===================================================================================================
Follow(Onenine): { <1-9>, }, ',' }
Follow(Char): { <Aa-Zz, 0-9...any>, " }
Follow(Chars): { " }
Follow(Digit): { Zero, <1-9> }
Follow(Digits): Follow(Digit)
Follow(Int): { ',', '}' }
Follow(Str): { ':', ',', '}' }
Follow(Object): { $, ',', '}' }
Follow(Element): { ',', '}' }
Follow(Member): { ',', '}' }
Follow(Members): { '}' }
Follow(Dummyjson): { $ }
