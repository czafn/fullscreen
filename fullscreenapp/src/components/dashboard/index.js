/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { Flex, WhiteSpace} from 'antd-mobile';
import lodashmap from 'lodash.map';
import {getdevicestatus_alaramlevel, getdevicestatus_isonline} from "../../util/getdeviceitemstatus";

const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
     width: 100%;
     height: 100%;
	   overflow: hidden;
     // background: rgba(10, 108, 163, 0.3);
  }
  .item{
    background: #fff;
    height: 150px;
    border: 1px solid #eee
  }
  .title{
    height: 50px;
    border-bottom: 1px solid #eee;
    color: #333;
    font-size: 18px;
    text-align: center;
    padding-top: 10px;
  }
  .content{
    height: 100px;
    color: #333;
    font-size: 28px;
    text-align: center;
    padding-top: 26px;
  }

`;

class Page extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {

        let {centerIndex, rightIndex} = this.props;
        return (
            <Chart >
              {/*<div className="crumbsTitle">CAR-车辆使用年限</div>*/}
              <div className="flex-container">
                <WhiteSpace size="lg" />
                <Flex>
                  <Flex.Item>
                    <div className='item' >
                      <div className='title'>
                        总数量
                      </div>
                      <div className='content'>
                        {centerIndex.count_all}
                      </div>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className='item' >
                      <div className='title' style={{color:'#d31e25'}}>
                        三级
                      </div>
                      <div className='content'  style={{color:'#d31e25'}}>
                        {centerIndex.count_red}
                      </div>
                    </div>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                  <Flex.Item>
                    <div className='item' >
                      <div className='title' style={{color:'#ed932f'}}>
                        二级
                      </div>
                      <div className='content'  style={{color:'#ed932f'}}>
                        {centerIndex.count_orange}
                      </div>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className='item' >
                      <div className='title' style={{color:'#f6d06a'}}>
                        一级
                      </div>
                      <div className='content'  style={{color:'#f6d06a'}}>
                        {centerIndex.count_yellow}
                      </div>
                    </div>
                  </Flex.Item>
                </Flex>
              </div>
            </Chart>
        );
    };
}

const mapStateToProps = ({
   deviceext:{countcar,countbus},
   catlworking:{
     countonline,
     counttotal,
     countalarm3,
     countalarm2,
     countalarm1
 },
 }) => {
  let count_online = countonline;
  let count_offline = counttotal-countonline;

  let count_yellow = countalarm1;
  let count_red = countalarm3;
  let count_orange = countalarm2;


  const centerIndex = {
    count_online:count_online,
    count_offline:count_offline,
    count_all:count_online+count_offline,
    count_red:count_red,
    count_yellow:count_yellow,
    count_orange:count_orange,
  };
  const rightIndex = {
    bus:countbus,
    car:countcar
  };

  return {centerIndex, rightIndex};
}

export default connect(mapStateToProps)(Page);
