import React, {useEffect} from 'react';
import {
	StyledHeader,
	Highlight,
	StyledText,
	StyledSeparator,
	StyledFieldSection,
	StyledFundsInfo, StyledAccountBalance, Balance, Label, StyledCustomLink
} from "../../../styles";
import DivBox from "../../../../../../General/DivBox/DivBox";
import {registerAction} from "../../../../../store/actions";
import {connect} from "react-redux";
import ROUTES from "../../../../../../../routes/routes";
import TutorialStep from "../../../../TutorialStep/TutorialStep";
import {fetchFundsAccount} from "../store/actions";
import {withRouter} from "react-router-dom";
import ActionButtons from "../../../../ActionButtons";
import {displayErrorAction} from "../../../../../../../store/actions/actions";
import Select from "../../../../../../UI/SolarForms/Select/Select";
import CustomLink from "../../../../../../UI/CustomLink/CustomLink";

const LoadFunds = withRouter(({fetchFundsUser, account, history, match, showMessage, profile, investor, recipient}) => {
	useEffect(() => {
		fetchFundsUser(match.params.userType, match.params.username)
	}, []);

	const handleContinue = () => {
	};

	const handleChange = (e) => {
			history.push(ROUTES.PROFILE_PAGES.SETTINGS_PAGES.FUNDS_PAGES.LOAD_FUNDS.replace(':username', match.params.username).replace(':userType', e.target.value))
	};

	const generateItems = () => {
		const itemList = [];
		if (profile && profile.Name) {
			itemList.push({name: `${profile.Name} / individual`, value: 'user'})
		}
		if (investor && investor.Name) {
			itemList.push({name: `${investor.Name} / investor`, value: 'investor'})
		}
		if (recipient && recipient.Name) {
			itemList.push({name: `${recipient.Name} / recipient`, value: 'recipient'})
		}
		return itemList;
	};

	const profileItems = generateItems();

	return (
		<div className="ProfilePageContainer">
			<div className="row">
				<div className="col-12 col-md-10 col-lg-8 mx-auto margin-bottom">
					<StyledHeader>Your Registered User Profile and Account to fund</StyledHeader>
					<StyledSeparator size={4}/>
					<StyledFieldSection padding={15}>
						<Select label='select account address to fund' items={profileItems} onChange={handleChange}/>
					</StyledFieldSection>
					<StyledFieldSection>
						<DivBox
							type="full"
							text={account.Name}
							label={match.params.userType}
							leftIcon="profile-user-icon"
							rightIcon="profile-edit-icon"
						/>
						<DivBox
							text={account.PublicKey}
							label="public key"
							leftIcon="profile-badge-icon"
						/>
					</StyledFieldSection>
					<StyledFundsInfo>
						<StyledAccountBalance>
							<Balance>$0</Balance>
							<Label>ACCOUNT BALANCE</Label>
						</StyledAccountBalance>
					</StyledFundsInfo>
					<StyledSeparator size={5}/>
					<StyledHeader>Add USD funds to your Wallet </StyledHeader>
					<StyledText>
						<Highlight>Note. </Highlight>
						Note. The platform currently uses AnchorUSD, a third party provider to load a USD backed asset (termed USDx)
						for accounts. Please follow the below instructions to purchase AnchorUSD.
					</StyledText>
					<StyledText>
						<Highlight>Stablecoin provider: </Highlight>
						Anchor USD.
						<CustomLink label='Learn more >' weight='light' font={12}/>
					</StyledText>
					<StyledSeparator noBorder={true} size={5}/>
					<TutorialStep
						step={"STEP 1"}
						description={<span><Highlight>Access Anchor USD using the link below. </Highlight>
						This link contains details of your  Open Solar user account in order to reference it
						to youe Anchor USD account. If you don’t use this link, then your USDx funds in AnchorUSD
						will not be linked to the Open Solar platform</span>}
						link={{label: 'MAGIC LINK HERE >', url: '#'}}
						image={{description: 'You should see a screen like this: '}}
					/>
					<TutorialStep
						step={"STEP 2"}
						description={<span><Highlight>Purchase USDx by linking your bank details to AnchorUSD. </Highlight>
						You will have to wait for 2 to 3 business days for your funds to show in your account…</span>}
						image={{description: 'You should see a screen like this: '}}
					/>

					<TutorialStep
						step={"STEP 3"}
						description={<span><Highlight>Return to OpenSolar once your funds show up in AnchorUSD. By this time,
						your funds should be available in your Open Solar account.</Highlight>
						Please contact us if you see AnchorUSD funds but not in your OpenSolar account.  </span>}
						image={{description: 'You should see a screen like this: '}}
					/>
					<StyledSeparator size={5}/>
					<ActionButtons
						cancelButton={{
							url: ROUTES.PROFILE_PAGES.SETTINGS_PAGES.FUNDS,
							label: 'go back'
						}}
						confirmButton={{
							// action: handleContinue,
							url: ROUTES.PROFILE_PAGES.SETTINGS_PAGES.FUNDS,
							label: 'next'
						}}
					/>
				</div>
			</div>
		</div>
	)
});

const mapStateToProps = state => ({
	account: state.funds.user,
	profile: state.profile.user.items,
	investor: state.profile.investor.items.U,
	recipient: state.profile.recipient.items.U,
});

const mapDispatchToProps = dispatch => ({
	registerEntity: (entity, info) => dispatch(registerAction(entity, info)),
	fetchFundsUser: (entity, account) => dispatch(fetchFundsAccount(entity, account)),
	showMessage: (type, message) => dispatch(displayErrorAction(type, message)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadFunds);
