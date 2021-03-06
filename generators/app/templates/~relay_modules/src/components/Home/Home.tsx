import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
	FormattedMessage,
	FormattedHTMLMessage,
	injectIntl,
	IntlShape,
} from 'react-intl'
import { connect } from 'react-redux'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import { Environment } from 'relay-runtime'

import configEnvironment from 'config/environment'
import RootState from 'store/RootState'

import Spinner from 'components/Spinner'
import { HomeQueryResponse } from '__generated__/HomeQuery.graphql'

import styles from './Home.module.css'
import logo from './logo.svg'

export interface HomeProps extends RouteComponentProps {
	environment?: Environment
}

const Home: React.FC<HomeProps & { intl: IntlShape }> = ({
	environment = configEnvironment,
	intl,
}) => {
	return (
		<div className={styles.root}>
			<Helmet>
				<title>
					{intl.formatMessage({
						id: 'nav.home',
						defaultMessage: 'Home',
					})}
				</title>
			</Helmet>
			<div className={styles.header}>
				<img className={styles.logo} src={logo} alt="logo" />
				<p>
					<FormattedHTMLMessage
						id="home.instructions"
						defaultMessage="Edit <code>src/components/Home/Home.tsx</code> and save to reload."
					/>
				</p>
				<a
					href={intl.formatMessage({
						id: 'home.learnHref',
						defaultMessage: 'https://reactjs.org/',
					})}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FormattedMessage id="home.learn" defaultMessage="Learn React" />
				</a>
				<QueryRenderer<{ response: HomeQueryResponse; variables: {} }>
					{...{
						environment,
						query: graphql`
							query HomeQuery {
								hello
							}
						`,
						variables: {},
						render({ error, props }) {
							if (error) {
								return <div>Error! {error.message}</div>
							}
							if (!props) {
								return <Spinner />
							}
							return <div>{props.hello}</div>
						},
					}}
				/>
			</div>
		</div>
	)
}

export default connect<void, void, void, RootState>(null)(injectIntl(Home))
