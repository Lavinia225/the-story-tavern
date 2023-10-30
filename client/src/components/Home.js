function Home(){
    return(
        <div id='home'>
            <h2>Welcome to The Story Tavern!</h2>
            <p>Haiya! If by some miracle you have obtained the url to this website, know that it is still being created.</p>
            <div id='home-grid'>
                <div id='home-column'>
                    <h3>What is The Story Tavern?</h3>
                    <li>It is a website for sharing short stories. While you could technically write a full length novel, there is presently no way to keep track
                        of your progress reading one so it is not recommended. Feel free to browse around and find something you would like to read.
                    </li>
                </div>
                <div id='home-column'>
                    <h3>Usage Guidelines</h3>
                    <ul>
                        <li>No 'Adult' works.</li>
                        <li>Timestamps are in UTC</li>
                        <li>If you've encountered a bug/error or need to contact the owner for any reason, the information is below.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home