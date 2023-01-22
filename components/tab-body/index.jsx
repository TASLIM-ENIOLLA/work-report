import Tabs from '../tabs'
import {TabsContext} from '/contexts/pages/Tabs'
import {useState, useContext, Fragment} from 'react'
import styles from '/styles/components/TabBody.module.css'

export default function TabBody(){
	const {tabName, updateTabName, tabTitle} = useContext(TabsContext)
	const tabComponent = getTabComponent(tabName)

	function getTabComponent(tabName){
		const [firstOne] = Tabs.filter(({name}) => name === tabName)
		const {component} = firstOne
		
		return component
	}

	return (
		<section className = {`row bg-light shadow-sm border py-5 ${styles.tab_body}`}>
			<div className = 'col-12'>
				<h2 className = 'gd-sage text-capitalize'>{tabTitle}</h2>
				<section className = 'pt-5'>
					{getTabComponent(tabName)}
				</section>
			</div>
		</section>
	)
}