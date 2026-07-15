우리 반 소개 홈페이지 — 메인 + 6개 모둠 통합본
====================================================

폴더 구성
---------
class-serene-publishing-with-teams/
├─ index.html                     메인페이지
├─ css/
│  ├─ reset.css                  전체 기본 스타일
│  ├─ style.css                  메인페이지 공통 스타일
│  └─ team-common.css            모든 모둠 페이지 공통 레이아웃
├─ js/
│  ├─ main.js                    메인페이지 모션
│  └─ team.js                    모둠 페이지 공통 메뉴·등장 모션
├─ team1/
│  ├─ index.html
│  ├─ css/team1.css
│  └─ images/
├─ team2/
├─ team3/
├─ team4/
├─ team5/
└─ team6/

CSS 연결 순서
-------------
각 모둠 index.html에서는 아래 순서로 CSS를 연결합니다.

1. ../css/reset.css
2. ../css/style.css
3. ../css/team-common.css
4. ./css/teamN.css

뒤에 연결된 teamN.css가 가장 우선 적용되므로
각 팀은 루트 공통 파일을 수정하지 않고 자기 CSS에서 디자인을 변경할 수 있습니다.

학생 작업 규칙 권장
-------------------
- 1모둠: team1 폴더만 수정
- 2모둠: team2 폴더만 수정
- 3모둠: team3 폴더만 수정
- 4모둠: team4 폴더만 수정
- 5모둠: team5 폴더만 수정
- 6모둠: team6 폴더만 수정

학생이 수정할 주요 파일
-----------------------
- teamN/index.html: 글 내용, 구성원 정보, 이미지 태그
- teamN/css/teamN.css: 팀 컬러와 개별 디자인
- teamN/images/: 히어로 이미지와 프로필 사진

공통 파일 수정 담당
-------------------
아래 파일은 충돌 방지를 위해 선생님 또는 관리자만 수정하는 것을 권장합니다.

- /index.html
- /css/reset.css
- /css/style.css
- /css/team-common.css
- /js/main.js
- /js/team.js

실행 방법
---------
압축 해제 후 루트의 index.html을 실행합니다.
VS Code Live Server 사용을 권장합니다.
