# spa

* Login, Join, Main 세가지 페이지가 존재하며 그 중 공통으로 사용되는 컴포넌트들은 `components/` 폴더에 넣었습니다.
* 사용자가 없는 주소에 접근할 경우 `NotFound` 로 응답됩니다.

## Login
![이미지](https://t1.daumcdn.net/cfile/tistory/99367D4B5BB37DB01C)

로그인 페이지입니다. 먼저 휴대폰번호가 유효한 형식인지 검사를 한 후에 서버와 통신합니다.  
휴대폰번호가 존재할 경우 해당 휴대폰번호와 패스워드가 일치한지를 검사합니다.  
성공시에는 로그인되고 그렇지 않은 경우는 로그인 실패 `Modal` 이 보여집니다.

## Join
![이미지](https://t1.daumcdn.net/cfile/tistory/9935434B5BB37DB11C)

회원가입 페이지입니다. 각 입력 항목에는 유효성 검사가 존재하고 닉네임과 휴대폰 번호는 유저별로 고유합니다.  
때문에 중복할 수 없도록 `lodash` 의 `debounce` 를 통해 입력시 일정 주기마다 DB 에서 해당 유저가 존재하는지 검사합니다.

## Main
![이미지](https://t1.daumcdn.net/cfile/tistory/99C4314B5BB37DB325)

![이미지](https://t1.daumcdn.net/cfile/tistory/9954734B5BB37DB405)

콘텐츠가 보여지는 메인페이지입니다. 타임라인에는 팔로우한 유저의 글들이 시간순서대로 보여집니다.  
또한 자기가 쓴 글은 수정이 가능하도록 하였습니다.
프로필페이지도 전환이 가능하므로 같은 메인페이지로 포함시켰습니다.