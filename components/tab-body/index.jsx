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
		<section id = 'tab-page-title' className = {`row bg-white shadow-sm border py-5 ${styles.tab_body}`}>
			<div className = 'col-12 px-4'>
				<h2 className = 'gd-sage text-capitalize'>{tabTitle}</h2>
				<section className = 'pt-3'>
					{getTabComponent(tabName)}
				</section>
			</div>
		</section>
	)
}
