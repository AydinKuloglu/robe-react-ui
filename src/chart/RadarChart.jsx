import React, { PropTypes } from "react";
import { RadarChart as Chart, Radar, PolarAngleAxis, PolarRadiusAxis, PolarGrid } from "recharts";
import BaseChart from "./BaseChart";

export default class RadarChart extends BaseChart {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {

        ...BaseChart.DEFAULT_PROP_OF_GENERAL_COMPONENTS,
        /**
         * {@link http://recharts.org/api#RadarChart}
         */
        propsOfChart: PropTypes.shape({
            ...Chart.PropTypes,
            ...BaseChart.DEFAULT_PROP_TYPES_OF_CHART
        }).isRequired,

         /**
         * {@link http://recharts.org/api/#Radar}
         */

        propsOfChildrens: PropTypes.arrayOf(PropTypes.shape({
            ...Radar.PropTypes
        })).isRequired,

        /**
         * {@link http://recharts.org/api/#PolarAngleAxis}
         */
        propsOfPolarAngleAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...PolarAngleAxis.PropTypes
            }),
            PropTypes.bool
        ]),

        /**
         * {@link http://recharts.org/api/#PolarRadiusAxis}
         */
        propsOfPolarRadiusAxis: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...PolarRadiusAxis.PropTypes
            }),
            PropTypes.bool
        ]),
        
        /**
         * {@link http://recharts.org/api/#PolarGrid}
         */
        propsOfPolarGrid: React.PropTypes.oneOfType([
            PropTypes.shape({
                ...PolarGrid.PropTypes
            }),
            PropTypes.bool
        ]),
    };

    static defaultProps = {
        ...BaseChart.DEFAULT_PROPS_VALUE_OF_GENERAL_COMPONENTS,
        propsOfPolarAngleAxis: false,
        propsOfPolarRadiusAxis: false,
        propsOfPolarGrid: false
    };

    render(): Object {
        return (
            <Chart {...this.props.propsOfChart}>
                {this.__renderRadars()}
                {this.__renderPolarAngleAxis()}
                {this.__renderPolarRadiusAxis()}
                {this.__renderPolarGrid()}
                {this.__renderToolTip()}
                {this.__renderCartesianGrid()}
                {this.__renderLegend()}
            </Chart>
        );
    }
    __renderRadars(): Object {
        let propsOfChildrens = this.props.propsOfChildrens;

        let radarArr = [];
        for (let i = 0; i < propsOfChildrens.length; i++) {
            let propsOfChildren = propsOfChildrens[i];
            radarArr.push(<Radar key={`radar-${i}`} {...propsOfChildren} />);
        }
        return radarArr;
    }

    __renderPolarAngleAxis(): Object {
        if (this.props.propsOfPolarAngleAxis) {
            if (this.props.propsOfPolarAngleAxis === true) {
                return <PolarAngleAxis />;
            }
            return (<PolarAngleAxis {...this.props.propsOfPolarAngleAxis} />);
        }
        return null;
    }

    __renderPolarRadiusAxis(): Object {
        if (this.props.propsOfPolarRadiusAxis) {
            if (this.props.propsOfPolarRadiusAxis === true) {
                return <PolarRadiusAxis />;
            }
            return (<PolarRadiusAxis {...this.props.propsOfPolarRadiusAxis} />);
        }
        return null;
    }

    __renderPolarGrid(): Object {
        if (this.props.propsOfPolarGrid) {
            if (this.props.propsOfPolarGrid === true) {
                return <PolarGrid />;
            }
            return (<PolarGrid {...this.props.propsOfPolarGrid} />);
        }
        return null;
    }

}
