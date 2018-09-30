# Twitter

Twitter 프로젝트는 Web Front-end 의 기술을 익히기 위해 진행한 프로젝트입니다. Twitter(트위터) 와의 저작권 문제가 생길 시 삭제 하도록 하겠습니다.
  
각 폴더별로 README.md 파일이 존재합니다.

## 폴더 구조
```
Twitter__source
├── client/
│   ├── build/
│   ├── config/
│   ├── src/
│   ├── static/
│   └── index.html
│
└── server/
    ├── route/
    ├── secret/
    ├── service/
    └── app.js
```
### client
클라이언트에 관련된 소스코드들이 있습니다.  
폴더구조는 vue.js 의 [webpack template](https://github.com/vuejs-templates/webpack) 입니다.
#### client/build
#### client/config
#### client/static
#### client/index.html

#### client/src
[Vallista](https://github.com/Vallista/vue-boilerplate)님의 구조를 이용했습니다.  
각 폴더별로 `README.md` 가 존재합니다. 

### server
서버에 관련된 소스코드들이 있습니다.
#### server/route
클라이언트 요청에 응답하는 URI 가 작성된 `index.js` 파일이 존재합니다.

#### server/secret
서버의 암호와와 관련된 코드들이 `index.js` 파일에 존재합니다. 

#### server/service
DB 와의 통신을 위한 소스코드들이 존재하는 폴더입니다.

#### server/app.js
express 의 `app.js` 입니다.

## 기능

* 회원가입
* 로그인
* 팔로우, 언팔로우
* 이미지 업로드
* 트윗 수정 및 삭제
* 자기소개 작성 및 수정
* 회원 검색
* 반응형 웹