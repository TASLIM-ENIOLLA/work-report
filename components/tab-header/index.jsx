import Tabs from '../tabs'
import {useRouter} from 'next/router'
import {TabsContext} from '/contexts/pages/Tabs'
import {useState, useContext, Fragment} from 'react'
import styles from '/styles/components/TabHeader.module.css'

export default function SPARoute(){
	const router = useRouter()
	const {tabName, updateTabName} = useContext(TabsContext)

	function getTabNameNTitle(){
		return Tabs.map(({name, title}) => ({name, title}))
	}

	function switchTab(tabName){
		updateTabName(tabName)
		router.push(tabName)
	}

	return (
		<header className = {`row ${styles.tab_header}`}>{
			getTabNameNTitle().map(({name, title}) => (
				<button key = {name} onClick = {() => switchTab(name)} className = {`${styles.tab_button} ${(
					(name === tabName)
					? 'bg-cyan'
					: 'bg-dark'
				)} border-0 outline-0 gd-sage text-capitalize text-white p-3`}>
					{title}
				</button>
			))
		}</header>
	)
}