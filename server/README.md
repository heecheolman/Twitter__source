# server
서버와 관련된 코드가 들어있습니다.

### route/index.js
클라이언트 요청에 응답하는 URI 가 작성된 `index.js` 파일이 존재합니다. 

### secret/index.js
서버의 암호와와 관련된 코드들이 `index.js` 파일에 존재합니다. 
* PBKDF2 암호화기법을 사용하였습니다.
* 필요한경우 고유 key 를 이용하여 암호화하고 복호화합니다.

### service/
DB 와의 통신을 위한 소스코드들이 존재하는 폴더입니다.
* `knex.js` 를 이용해 `postgreSQL` 과 연결합니다.
* 기능별로 모듈을 나누었습니다.
* `service.config.js` 파일에는 DB 연결을 위한 `knex.js` 의 config 가 설정되어있습니다. 

### server/app.js
express 의 `app.js` 입니다.
* `client/static/images` 폴더와 `client/dist/static` 를 `express.static` 을 이용해 정적파일로 취급합니다.

