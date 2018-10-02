# src

#### assests/
`css`, `img` 파일이 존재합니다.   
`common.css` 에는 구조를 잡는 class 들과 Modal Animation 만 간단히 존재합니다.


#### config/
`router.js` 를 가지고있습니다.

#### lib/
트위터 프로젝트에 쓰이는 공통 함수인 `DateCalculator.js` 파일이 있습니다.

#### shared-components/
프로젝트 내에 공통적으로 사용되는 컴포넌트들이 담겨있습니다. 해당 프로젝트에는 프로필과 홈 에서 쓰이는 Header 가 공통 컴포넌트입니다.

#### spa 
페이지 단위로 나누어진 spa 폴더입니다.  
Join, Login, Main, 404 NotFound 페이지가 존재합니다. 공통적으로 사용되는 컴포넌트는 `components/` 폴더에 존재하고 나머지의 해당 페이지에 필요한 컴포넌트들은 폴더에 랩핑되어 있습니다.

#### vuex
Vue.js 의 상태관리를 위한 vuex 파일들이 들어있다.
