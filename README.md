# 2023 MY RECIPE PROJECT
# 나만의 레시피를 만들고 찾아볼 수 있는 레시피 웹사이트!
# AI voice phishing prevention system using STT API for the elderly and the weak
#### Project nickname : bakers-recipe
#### Project execution period : 2023.08 ~ 2023.10
-----------------------
## Description
본 프로젝트는 1인 프로젝트로, 과거 제빵업계에서 일하면서  '레시피를 저장해 놓고 편리하게 볼 수 있으면 좋겠다' 라는 생각으로 만든 웹사이트.

### 1. function list

nodeJS 와 express 를 이용한 백엔드 서버 구축
DB 구축
로그인
회원가입
리스트 CRUD

### 2. detailed function

nodeJS 와 express 를 이용한 백엔드 서버 구축
- axios를 이용하여 express 통신 구현
- routes 폴더를 만들고 api 들을 유지, 보수에 용이하게 카테고리별로 묶음.

DB 구축
- sql 작업을 쉽게 하기 위한 ORM 라이브러리중 하나인 sequelize를 사용
  
로그인 
- accessToken을 로컬스토리지에 저장하는 방식으로 로그인 구현
- googleOAuth2를 이용한 소셜로그인 구현
- mailSender를 이용한 이메일인증
  
회원가입
- becrypt를 이용한 패스워드 생성
  
회원, 리스트, 카테고리 CRUD

react 사용
- useState, redux 를 이용하여 단일, 글로벌 상태변화 구현
- route를 이용한 페이지 렌더링 최소화

scss 사용
- scss를 사용하여 코드 간소화

## Environment
javaScript, React, nodeJs, express, antDesign, scss

## Prerequisite

## Files

## Usage 
