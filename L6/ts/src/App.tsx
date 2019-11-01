import React from 'react'
// import * as styled from 'styled-components';
//
// const HeaderContent = styled.div`
// 	height: 50px;
// 	background-color: #858585;
// `;
// const Wrapper = styled.div`
// 	margin: 0 auto;
// 	display: flex;
// 	max-width: 1200px;
// 	padding-left: 50px;
// 	padding-right: 50px;
// 	justify-content: space-between;
// 	align-items: flex-start;
// `;

interface IAppProps {
  title: string;
}

export const App = (props: IAppProps) => (
    <div>
      <div>
        <p>Header</p>
        <div>
          {props.title}
        </div>
      </div>
    </div>
  );




