import React, { Component } from 'react';
import CustomDatePicker from './customDatePicker.component';
import Moment from 'moment';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CustomDateRangePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateSelected: '',
            displayDateRangePopup: false,
            leftPosition: 0,
            topPosition: 0,
        }
    }

    componentDidMount() {
        const dateRange = [Moment().subtract(7, 'days'), Moment()];
        const date = `${Moment(dateRange[0]._d).format('D MMM')} - ${Moment(dateRange[1]._d).format('D MMM YY')}`;
        this.setState({
            dateSelected: date,
        });
    }

    handleDisplayDatePicker = () => {
		const element = document.getElementById('customDatePicker');
		const position = element.getBoundingClientRect();
		const { displayDateRangePopup } = this.state;
		this.setState({
			displayDateRangePopup: !displayDateRangePopup,
			leftPosition: position.x,
			topPosition: position.y,
		});
    }

    handleDisplayDateRangePopup = (dates, displayPopup, dateRange, selectedLabel) => {
      const { getDateRange } = this.props;
		this.setState({
			dateSelected: dateRange,
			displayDateRangePopup: displayPopup,
        });
        getDateRange(dateRange, dates, selectedLabel);
	}
  
    render() {
        const { topPosition, leftPosition, displayDateRangePopup, dateSelected } = this.state;
        const { maxNdays } = this.props;
        return (
            <div>
                <div
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#3a7e73',
                        height: '30px',
                        position: 'relative',
                        borderBottomLeftRadius: '3px',
                        borderTopLeftRadius: '3px',
                    }}
                >
                    <div className="analytics-icons date-picker" style={{ display: 'inline-block' }} />
                </div>
                <Input
                    placeholder="Select date"
                    value={dateSelected !== '' ? dateSelected : 'SELECT DATE'}
                    onClick={this.handleDisplayDatePicker}
                    id="customDatePicker"
                    autoComplete="off"
                />
                {displayDateRangePopup
                    && (
                        <CustomDatePicker
                            handleDisplayDateRangePopup={this.handleDisplayDateRangePopup}
                            customContainerStyle={{
                                top: topPosition,
                                left: leftPosition,
                            }}
                            closeCustomDatePicker={this.closeCustomDatePicker}
                            maxNdays={maxNdays}
                        />
                    )
                }
            </div>
        );
    }
}

CustomDateRangePicker.propTypes = {
    getDateRange: PropTypes.func.isRequired,
    maxNdays: PropTypes.number.isRequired,
}

export default CustomDateRangePicker;
