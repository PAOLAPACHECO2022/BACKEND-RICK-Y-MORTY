import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
//to delete 
import { deleteSeason } from '../../actions/profileActions';

class Season extends Component {
  onDeleteClick(id) {
    this.props.deleteSeason(id);
  }

  render() {
    const season = this.props.season.map(exp => (
      <tr key={exp._id}>
        <td>
        <Image
         style = {{
          
          minWidth: 100,
          maxWidth: 100,
          maxHeight: 100,
        }}
                 src="https://www.ecranlarge.com/media/cache/1600x1200/uploads/articles/001/016/558/rick-et-morty-szechuan-1014127-large.JPG"
         
                Nameclass=" img-thumbnail aline-center"
                alt=""
                ></Image> </td>   
        <td>{exp.nameseason}</td>
        <td>{exp.version}</td>
        <td>{exp.episodes}</td>
        <td>{exp.numbercharacters}</td>
        
       
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Seasons</h4>
        <table className="table">
          <thead>
            <tr>
            <th>Img.</th>
              <th>Name Season</th>
              <th>Version</th>
               <th>Number of Episodes</th>
              <th>Number of Characters</th>
              
              <th />
            </tr>
            {season}
          </thead>
        </table>
      </div>
    );
  }
}

Season.propTypes = {
  deleteSeason: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSeason }
)(withRouter(Season));
