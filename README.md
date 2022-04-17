## Language
- Dummyjson -> Object
- Object -> LeftBrace Members RightBrace
- Members -> Member
         | Member Comma Members
- Member -> Str Colon Element
- Element -> Str
         | Int
	  | Object
- Str -> StrSign Chars StrSign
- Chars -> Char
       | Char Chars
- Int -> Digit
     | Onenine Digits								
- Digits -> Digit
        | Digit Digits				
- Digit -> Zero										
       | Onenine									
- LeftBrace -> {
- RightBrace -> }
- Comma -> ,
- Colon -> :
- StrSign -> "
- Zero -> 0
- Onenine -> <1-9>
- Char -> <Aa-Zz,0-9...any>

## First
- First(Onenine): { <1-9> }
- First(Char): { <Aa-Zz, 0-9...any> }
- First(Chars): First(Char)
- First(Digit): { 0, First(Onenine) }
- First(Digits): First(Digit)
- First(Int): First(Onenine)
- First(Str): { " }
- First(Object): { '{' }
- First(Element): { First(Str), First(Int), First(Object) }
- First(Member): First(Str)
- First(Members): First(Str)
- First(Dummyjson): First(Object)

## Follow
- Follow(Onenine): { <1-9>, }, ',' }
- Follow(Char): { <Aa-Zz, 0-9...any>, " }
- Follow(Chars): { " }
- Follow(Digit): { Zero, <1-9> }
- Follow(Digits): Follow(Digit)
- Follow(Int): { ',', '}' }
- Follow(Str): { ':', ',', '}' }
- Follow(Object): { $, ',', '}' }
- Follow(Element): { ',', '}' }
- Follow(Member): { ',', '}' }
- Follow(Members): { '}' }
- Follow(Dummyjson): { $ }
