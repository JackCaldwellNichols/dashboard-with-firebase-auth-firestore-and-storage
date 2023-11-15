
import './featured.scss'
import { KeyboardArrowDownOutlined, MoreVertOutlined,KeyboardArrowUpOutlined  } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';


const FeatureChart = () => {
  return (
    <div className='feature'>
      <div className="top">
        <h1 className='title'>Total Revenue</h1>
        <MoreVertOutlined fontSize='small'/>
      </div>
      <div className="bottom">
        <div className="featureChart">
          <CircularProgressbar value={70} text='70%' strokeWidth={5}/>
        </div>
        <p className="title">
          Total sales today
        </p>
        <p className="amount">
          $420
        </p>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sequi?
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownOutlined fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureChart