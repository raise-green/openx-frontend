import React from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";

const StyledCustomLinkContainer = styled.div`
	padding: 8px 0;
`;
const StyledCustomLink = styled(NavLink)`
	color: #4a90e2;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
	&:active {
		opacity: 0.7;
	}
`;

const CustomLink = ({url, label, children}) => {
	return (
		<StyledCustomLinkContainer>
			<StyledCustomLink to={url ? url : '#'}>
				{children || label}
			</StyledCustomLink>
		</StyledCustomLinkContainer>
	)
};

export default CustomLink;
