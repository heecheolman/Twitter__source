# shared-compoents - Header

콘텐츠 페이지와 프로필 페이지의 공통되는 컴포넌트가 `Header` 입니다.  
유저는 홈, 프로필, 로그아웃 버튼을 어디서나 누를 수 있다고 생각하여 공통 컴포넌트로 집어넣고 중첩된 라우트를 사용했습니다.

* `Header` 의 '검색하기' 기능은 입력된 토큰이 user DB 의 nickname 중 한글자라도 들어갈 경우 해당 유저들을 전부 가져옵니다.
* 홈, 프로필에 transition 을 사용하여 좀 더 부드럽게 전환되게 했습니다.
   