export default function Index(){
    return (
        <></>
    )
}

export function getServerSideProps(){
    return {redirect: {
        destination: '/report/add-report'
    }}
}
