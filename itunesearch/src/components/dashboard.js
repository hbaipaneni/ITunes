import React  from 'react';
import { useSearchArtist } from './search';
const Dashboard = () => {

    const { inputText, setInputText, search } = useSearchArtist();
    return (
        <div className="row">
                <div className="col-12">
                    <input value={inputText} onChange={e => setInputText(e.target.value)} type="text" class="form-control"
                    placeholder="Search" aria-label="Search" />
                    <div>
                        {search.loading && <div>...</div>}
                        {search.error && <div>Error: {search.error.message}</div>}
                    </div>
                </div>
            {search.result &&
                search.result.map(value => (
                    <div className="col-3" key={value.trackId}>
                        <div className="card">
                            <div className="card-body">
                                <img src={value.artworkUrl100} className="card-img-top imgWidth" alt="..." target="_blank" />
                                <h5 className="card-title">{value.artistName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{value.primaryGenreName}</h6>
                                <a href={value.previewUrl} className="card-link">{`link to iTunes`}</a>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Dashboard;