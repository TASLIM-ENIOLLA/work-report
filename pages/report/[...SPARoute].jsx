import Head from 'next/head'
import Tabs from '/components/tabs'
import {useRouter} from 'next/router'
import {Fragment, useState, useEffect} from 'react'
import TabBody from '/components/tab-body'
import TabHeader from '/components/tab-header'
import {TabsContext} from '/contexts/pages/Tabs'

export default function SPARoute({SPARoute}){
	const [tabName, setTabName] = useState(SPARoute)

	class Tab{
		constructor(){this.tabName = tabName}
		updateTabName(tabName){setTabName(tabName)}
		get tabTitle(){
			const [firstOne] = Tabs.filter(({name}) => name === tabName)
			const {title} = firstOne

			return title
		}
	}

	return (
		<TabsContext.Provider value = {new Tab()}>
			<Head>
				<title>Work report - {tabName.replace('-', ' ')}</title>
			</Head>
			<section className = 'container py-5'>
				<TabHeader />
				<TabBody />
				<style jsx>{`
					.py-7{
						padding-top: 7rem;
						padding-bottom: 7rem;
					}
				`}</style>
			</section>
		</TabsContext.Provider>
	)
}

export function getServerSideProps(context){
	const {query: {SPARoute}} = context
	const [spaRoute] = SPARoute

	return {props: {
		SPARoute: spaRoute
	}}
}
