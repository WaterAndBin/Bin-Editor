import { changeState } from '@/store/modules/login';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Login {
  a: number;
}

interface State {
  login: Login;
}

function Test(): React.ReactElement {
  const asd = useSelector((state: State) => {
    return state.login;
  });
  const dispatch = useDispatch();

  return (
    <div>
      hallo,world
      <button
        onClick={() => {
          dispatch(changeState(222));
        }}
      >
        测试
      </button>
      {asd.a}
    </div>
  );
}

export default Test;
