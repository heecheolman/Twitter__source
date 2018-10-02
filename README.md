# Twitter

Twitter 프로젝트는 Web Front-end 의 기술을 익히기 위해 진행한 프로젝트입니다.  
Twitter(트위터) 와의 저작권 문제가 생길 시 삭제 하도록 하겠습니다.
  
각 폴더별로 README.md 파일이 존재합니다.

### Pages

#### 로그인 페이지
![이미지](https://t1.daumcdn.net/cfile/tistory/99367D4B5BB37DB01C)

#### 가입 페이지
![이미지](https://t1.daumcdn.net/cfile/tistory/9935434B5BB37DB11C)

#### 콘텐츠 페이지
![이미지](https://t1.daumcdn.net/cfile/tistory/99C4314B5BB37DB325)

#### 프로필 페이지
![이미지](https://t1.daumcdn.net/cfile/tistory/9954734B5BB37DB405)

#### 반응형
![이미지](https://t1.daumcdn.net/cfile/tistory/99A078425BB37E5A13)



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

## 기능

* 회원가입
* 로그인
* 팔로우, 언팔로우
* 이미지 업로드
* 트윗 수정 및 삭제
* 자기소개 작성 및 수정
* 회원 검색
* 반응형 웹

## 개발환경

#### [Vue.js](https://kr.vuejs.org/v2/guide/index.html)
컴포넌트 기반 웹 프레임워크

#### [Vuex](https://vuex.vuejs.org/kr/guide/state.html)
Vue.js 의 상태관리를 위한 라이브러리

####[express.js](https://expressjs.com/ko/)
Node.js 상에서 동작하는 웹 개발 프레임워크

#### [axios.js](https://github.com/axios/axios)
비동기 통신을 위한 모듈

#### [knex.js](https://knexjs.org/)
Node.js SQL 빌더 및 질의 기능을 제공하는 라이브러리

#### [multer](https://github.com/expressjs/multer)
파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어

#### AWS: EC2
아마존 웹서비스의 EC2를 이용해 호스팅

#### AWS: RDS
postgreSQL 을 사용


## 개발기
이 프로젝트를 진행한 이유는 원래 DB, 서버와의 통신법과 [Vue.js](https://kr.vuejs.org/v2/guide/index.html) 를 익히기 위해 시작을 했다.  
사실 어느 회사의 입사과제가 있었는데 생각보다 내 자신이 기본을 더 알지 못한다는 사실에 충격을 받아 진행했다는것이 맞는 것 같다. 결국 과제를 완성하지 못하였고 당연히 입사를 못하였다.
그래서 이 참에 대학교 포트폴리오용으로 만들어보자 해서 간단하게 만들어보았다. 총 기간은 약 1달 반정도 걸린것같다. 중간중간 개인적인 많은 일들이 있어서 좀 더 걸린것 같았다. 다행히 목표였던 9월 완성이라는 기간은 지켜냈다.

처음에는 간단한 비동기통신위주로 글만 올리게 하였다가 사진도 올리고싶어졌고 욕심이 점점 커져 스케일도 상대적으로 덩달아 커졌다. [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) 을 바탕으로 진행하였다가 40% 쯤 왔을 때 잘 안맞는 것 같아 
[Vallista](https://github.com/Vallista/vue-boilerplate)님의 spa 구조를 이용했다. 잘 안맞다고 생각한 이유는 내가 아직 atomic design에 대한 이해가 부족했을 수도 있지만 컴포넌트가 늘어남에 따라 관리가 어려웠을 뿐더러 분리되는 컴포넌트들이 너무 많아 갈아타게 되었다.

이 프로젝트를 진행하며 느낀 바로는 조그마한 웹 사이트도 굉장히 많은 노력이 들어간다는것을 느꼈다. 내 전공이 아니었을 때는 쉽게 생각했던 것들이 기능 하나하나 구현하면서 '간단한 기능은 절대 없다' 라는것이었다. 앞으로 '간단한 기능' 이라는 말은 빼야할 듯 싶다.
또한 설계가 굉장히 중요하다는것이 손가락과 멘탈로써 느껴졌다. 신중한 설계는 개발을 즐겁게 하는 것 같다. 경험이 많이 없었던 터라 설계에 대해 생각하지 못하고있었는데 개발을 진행하며 많은 모순(?) 들이 생겼다. 물론 많은 이유가 있겠지만, 그중 하나는 잘못된 설계로 인한 모순들이었다.
설계만 제대로 되어도 들어가는 비용이 줄어든다는 것이었다. 

리팩토링도 굉장히 중요했다. 개발을 70% 정도 했던 순간에 코드에대한 자신감이 사라졌다. 아마도 깔끔하지 못한 코드가 문제였던 것 같다. 일종의 지푸라기마냥 도서관에 [Clean Code](https://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788966260959) 라는 
책을 접하게 되었다. (광고 아닙니다 ㅎ) 나의 문제중 하나는 '일단 짜고 이따가 리팩토링하자' 였는데 이 책에서는 '르블랑의 법칙(leblanc`s raw) : 나중은 오지 않는다' 를 강조했다. 또 인상깊었던 구문이 '자전거 타는 법의 물리적인 지식을 알려주고 모든것을 알려주어도 처음타면 100% 넘어진다' 였다.
이 구문을 보니 내가 실제로 프로젝트를 해본 경험이 없어 많이 넘어졌던것 같다. 지금도 많이 넘어지고 있지만 잘 일어서서 간다. 많은 연습을 통해 오늘보다 좀 더 나은 내일이 되어야겠다.

