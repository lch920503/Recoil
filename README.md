# 리액트 전역 상태관리 recoil

<b>특징</b>

1. bottom up 방식
2. recoil로 선언한 state가 업데이트 될 경우, 해당 요소만 리렌더링이 일어남
3. recoil로 state가 연결되기 때문에 무분별한 사용은 예상하지 못한 에러를 발생 시킬 수 있음.
4. 비동기 처리도 가능 (selector 이용)

## atom 사용하기

1. 동기적 처리 방식
2. key와 default로 구성되어 있음

- key는 atom의 고유값
- default는 초기값

3. 불필요한 atom 사용은 데이터와 최적화에 좋지 않음

```tsx
export interface ITodo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
  key: "todoState",
  default: [],
});

export const categoryState = atom({
  key: "categoryState",
  default: "TODO",
});
```

## selector 사용하기

1. atom이나 다른 selector를 입력받아서 처리
2. atom처럼 update가 발생하면 해당 요소가 리렌더링됨
3. selector에 정의한 함수를 이용해 불필요한 상태관리를 정리할 수 있음  
   ex) A, B, C, D > C만 호출 / A, B, C는 호출하지 않음
4. 비동기적 처리 방식

```tsx
export cont todoSelector = selector({
	key: 'todoSelector',
	get: ({ get }) => {
		const todoList = get(todoState); // 입력받을 항목
		const category = get(categoryState);
		if(category === "TODO") return todoList.filter((todo) => todo.category === "TODO");
		if(category === "DOING") return todoList.filter((todo) => todo.category === "DOING");
		if(category === "DONE") return todoList.filter((todo) => todo.category === "DONE")
	},
});
```
