# 고양이 사진 검색 사이트

> 프로그래머스 과제관 연습 #1

## HTML

- [x] ~~`<div>` 요소를 시맨틱 마크업으로 변경~~

## CSS

- [ ] 반응형 검색 결과로 스타일 수정

  - [ ] 992px 이하: row 당 3개 column
  - [ ] 768px 이하: row 당 2개 column
  - [ ] 576px 이하: row 당 1개 column

- [ ] 다크모드 지원
  - [ ] CSS 파일 내 다크 모드 관련 주석 제거
  - [ ] 모든 글자 색상은 #FFFFFF , 배경 색상은 #000000
  - [ ] OS 다크모드 활성화 여부를 기반으로 동작
  - [ ] 유저가 테마를 토글링 할 수 있는 체크박스를 좌상단에 구현

## 이미지 상세 보기 모달

- [ ] 반응형 스타일 적용
  - [ ] 디바이스 너비 768px 이하일 때, 모달 너비 = 디바이스 너비
- [ ] 모달 닫는 조건 수정
  - [ ] 모달 영역 밖을 누르면 닫기
  - [ ] ESC 키를 누르면 닫기
  - [ ] 모달 우측 닫기 버튼 누르면 닫기
- [ ] 고양이 성격, 태생 정보 렌더링(/cats/:id 이용)
- [ ] 모달 열고 닫을 때 fade in/out 적용

## 검색 페이지

- [ ] 페이지 초기화 때 input 포커싱 적용
- [ ] 키워드 입력된 상태에서 input 클릭 시 기존 키워드 제거
- [ ] 필수 데이터를 불러오는 중일 때 로딩 UI 제공
- [ ] 검색 결과가 없는 경우, 적절한 UI 제공
- [ ] 최근 검색 키워드 기능 적용
  - [ ] SearchInput 아래에 가장 최근 검색한 5개의 키워드 노출
  - [ ] 키워드 누르면 검색 실행
- [ ] 새로고침해도 마지막 검색 결과 화면 유지 처리
- [ ] 랜덤 검색 기능 구현(버튼 누르면 /api/cats/random50 호출 결과 화면에 표시)
- [ ] 이미지 lazy load 처리
- [ ] 검색 결과 각 아이템에 마우스 오버시 고양이 이름 노출
- [ ] 스크롤 페이징 구현(스크롤바 끝에 도착하면 다음 페이지 로딩)

## 랜덤 고양이 배너 섹션 추가

- [ ] 앱 초기화 시점에 `/api/cats/random50` 요청 결과를 표시하는 섹션
  - [ ] 화면에 5개만 노출
  - [ ] 각 이미지는 좌, 우 슬라이드 이동 버튼 가짐
  - [ ] 좌, 우 버튼 클릭 시, 현재 노출된 이미지 제거 및 이전, 다음 이미지 노출
  - [ ] 적절한 트랜지션 적용

## 리팩토링

- [ ] ES6 module 형태로 코드 변경(번들러 사용 금지)
- [ ] API fetch 코드를 async/await 문으로 수정
- [ ] API fetch 코드에 적절한 오류 처리 적용

```
// 오류 처리 예시
const request = async (url: string) => {
    try {
      const result = await fetch(url);
      return result.json();
    } catch (e) {
      console.warn(e);
    }
  }

  const api = {
    fetchGif: keyword => {
      return request(`${API_ENDPOINT}/api/gif/search?q=${keyword}`);
    },
    fetchGifAll: () => {
      return request(`${API_ENDPOINT}/api/gif/all`);
    }
  };
```

- [ ] SearchResult의 각 아이템 클릭 이벤트에 Event Delegation 기법 적용
- [ ] 컴포넌트 내부 함수 및 Util 함수를 적절하게 나누기

## API 상세 내역

### 1. GET /cats/random50

- Request parameter: None
- Query paramter: None
- Response: Success 200

| Field name | Type  | Description                           |
| ---------- | ----- | ------------------------------------- |
| data       | Array | 랜덤한 50개의 고양이 사진 목록입니다. |

```
HTTP/1.1 200 OK

{
  "data": [
    {
      id: string
      url: string
      name: string
    }
  ]
}
```

### 2. GET /cats/search

- Request parameter: None

- Query parameter:
  | Field name | Type | Description |
  | ---------- | ------ | ------------------------ |
  | q | string | 고양이의 품종(영어/한글) |

- Response: Success 200
  | Field name | Type | Description |
  | ---------- | ----- | ---------------------------------------- |
  | data | Array | Keyword로 검색된 고양이 사진 목록입니다. |

```
HTTP/1.1 200 OK

{
  "data": [
    {
      id: string
      url: string
      name: string
    }
  ]
}
```

### 3. GET /cats/:id

- Request parameter:
  | Field name | Type | Description |
  | ---------- | ------ | -------------------------- |
  | id | string | 고양이 사진의 id값 입니다. |
- Query parameter: None
- Response: Success 200
  | Field name | Type | Description |
  | ---------- | ------ | ------------------------------- |
  | data | Object | Id로 검색된 고양이 사진 입니다. |

```
HTTP/1.1 200 OK

{
  "data": {
    name: string
    id: string
    url: string
    width: number
    height: number
    temperament: string
    origin: string
  }
}

```
