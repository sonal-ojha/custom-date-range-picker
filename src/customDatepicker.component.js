
import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Tooltip from 'rc-tooltip';

const customDateContainer = css`
    z-index: 56;
    position: absolute;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    background-clip: padding-box;
    margin: 4px;
    text-align: left;
    width: 200px;
    padding: 7px 3px;
`;

const dateBtn = css`
    background-color: white;
    color: #469589;
    height: 30px;
    font-size: 13px;
    width: 185px;
    line-height: 9px;
    border: 1px solid #f5f5f5;
    border-radius: 0px;
    text-align: left;
    margin-bottom: 4px;
    font-weight: normal;
    margin-left: 4px;
    padding-left: 13px;
    &:hover {
        background-color :#469589;
        color: white;
        height: 30px;
        font-size: 13px;
        font-weight: bold;
    }
`;

const nDays = css`
    display: flex;
    justify-content: left;
    border: 1px solid #f5f5f5;
    margin-left: 4px;
    width: 185px;
    padding-top: 7px;
    padding-left: 5px;
    color: #469589;
    height: 45px;
    font-size: 13px;
`;

const nDaysInput = css`
    width: 65px;
    padding: 0px;
    margin: 4px 0px 0px 5px;
    z-index: 56;
`;

const okBtn = css(
    dateBtn,
    {
        width: '40px',
        padding: '0px',
        paddingLeft: '10px',
    },
);

class CustomDatePicker extends React.Component {
    state = {
        noOfDays: '',
    }

    componentDidMount() {
        const { maxNdays } = this.props;
        this.setState({
            noOfDays: maxNdays
        })
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const { closeCustomDatePicker } = this.props;
        closeCustomDatePicker();
    }

    listenScrollEvent() {
        const { closeCustomDatePicker } = this.props;
        closeCustomDatePicker();
    }

    handleDisplayDate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { handleDisplayDateRangePopup } = this.props;
        let dateRange = [];
        switch (e.target.name) {
            case 'Today': dateRange = [Moment().startOf('day'), Moment()];
                break;
            case 'Yesterday': dateRange = [Moment().subtract(1, 'days').startOf('day'), Moment().subtract(1, 'days').endOf('day')];
                break;
            case 'Last 7 Days': dateRange = [Moment().subtract(7, 'days'), Moment()];
                break;
            case 'Last 30 Days': dateRange = [Moment().subtract(30, 'days'), Moment()];
                break;
            case 'This Month': dateRange = [Moment().startOf('month'), Moment()];
                break;
            case 'Last Month': dateRange = [Moment().subtract(1, 'month').startOf('month'), Moment().subtract(1, 'month').endOf('month')];
                break;
            default: dateRange = [Moment().subtract(7, 'days'), Moment()];
        }
        const date = `${Moment(dateRange[0]._d).format('D MMM')} - ${Moment(dateRange[1]._d).format('D MMM YY')}`;
        handleDisplayDateRangePopup(dateRange, false, date, e.target.name);
    }

    displayLastNDays = (e) => {
        const { maxNdays } = this.props;
        e.preventDefault();
        e.stopPropagation();
        const { handleDisplayDateRangePopup } = this.props;
        const { noOfDays } = this.state;
        if (noOfDays <= maxNdays) {
            const dateRange = [Moment().subtract(noOfDays, 'days'), Moment()];
            const date = `${Moment(dateRange[0]._d).format('D MMM')} - ${Moment(dateRange[1]._d).format('D MMM YY')}`;
            handleDisplayDateRangePopup(dateRange, false, date, `${noOfDays}`);
        }
    }

    handleLastNDays = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.value < 0) {
            this.setState({ noOfDays: 1 });
        } else if (e.target.value === '0') {
            this.setState({ noOfDays: '' });
        } else {
            this.setState({ noOfDays: e.target.value });
        }
    }

    handleEvent = (e, dates) => {
        e.preventDefault();
        e.stopPropagation();
        const { handleDisplayDateRangePopup } = this.props;
        let dateRange = [];
        let date = '';
        dateRange = [dates.startDate, dates.endDate];
        date = `${dates.startDate.format('D MMM')} - ${dates.endDate.format('D MMM YY')}`;
        handleDisplayDateRangePopup(dateRange, false, date, 'Custom Range');
    }

    handleOutsideClick = () => {
        const { closeCustomDatePicker } = this.props;
        closeCustomDatePicker();
    }

    handleStopEventBubble = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
        const { noOfDays } = this.state;
        const { customContainerStyle, maxNdays } = this.props;
        return (
            <div
                onClick={this.handleOutsideClick}
                role="presentation"
                style={{
                    width: '100vw',
                    height: '100vh',
                    top: '0',
                    left: '0',
                    zIndex: '55',
                    position: 'fixed',
                }}
            >
                <div css={customDateContainer} style={customContainerStyle}>
                    <Button name="Today" onClick={this.handleDisplayDate} css={dateBtn}>Today</Button><br />
                    <Button name="Yesterday" onClick={this.handleDisplayDate} css={dateBtn}>Yesterday</Button><br />
                    <Button name="Last 7 Days" onClick={this.handleDisplayDate} css={dateBtn}>Last 7 Days</Button><br />
                    <Button name="Last 30 Days" onClick={this.handleDisplayDate} css={dateBtn}>Last 30 Days</Button><br />
                    <Button name="This Month" onClick={this.handleDisplayDate} css={dateBtn}>This Month</Button><br />
                    <Button name="Last Month" onClick={this.handleDisplayDate} css={dateBtn}>Last Month</Button><br />
                    <DateRangePicker
                        onApply={this.handleEvent}
                        opens="left"
                        drops="up"
                        parentEl=".selected-date-range-btn"
                        singleDatePicker={false}
                        autoApply
                        maxDate={Moment().endOf('d')}
                    >
                        <button type="button" name="custom" css={dateBtn} style={{ zIndex: '99' }} onClick={this.handleStopEventBubble}>Custom Range</button>
                    </DateRangePicker>
                    <div css={nDays}>
                        <div style={{ marginTop: '5px' }}>Last</div>
                        <Tooltip
                            visible={noOfDays > 730}
                            placement="right"
                            trigger={['click']}
                            overlay={(
                                <div style={{ zIndex: '9999999' }}>
                                    <div
                                        style={{
                                            color: '#8ffff5', fontFamily: 'PT Sans, sans-serif', fontSize: '12px', fontWeight: 'bold',
                                        }}
                                    >
                                        Please enter value less than or equal to 730.
                                    </div>
                                </div>
                            )}
                        >
                            <Input
                                type="number"
                                min="1"
                                max="730"
                                maxLength="3"
                                value={noOfDays !== '' ? noOfDays : ''}
                                onChange={this.handleLastNDays}
                                css={nDaysInput}
                                style={{ zIndex: '99' }}
                                onClick={this.handleStopEventBubble}
                                autoComplete="off"
                            />
                        </Tooltip>
                        <div style={{ marginTop: '5px' }}>Days</div>
                        <Button name="OK" onClick={this.displayLastNDays} css={okBtn} disabled={noOfDays === '' || noOfDays > maxNdays}>OK</Button>
                    </div>
                </div>
            </div>
        );
    }
}

CustomDatePicker.defaultProps = {
    customContainerStyle: {},
    maxNdays: 730,
};

CustomDatePicker.propTypes = {
    handleDisplayDateRangePopup: PropTypes.func.isRequired,
    customContainerStyle: PropTypes.shape({}),
    closeCustomDatePicker: PropTypes.func.isRequired,
    maxNdays: PropTypes.number,
};

export default CustomDatePicker;
