import React from 'react';
import { Cell } from '../index';
import CellGroup from '../CellGroup';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';


describe("Cell and CellGroup", () => {

    it('should render value correctly', () => {
        const wrapper = mount(
            <Cell value="Custom Value"></Cell>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render title correctly', () => {
        const wrapper = mount(
            <Cell title="Custom Title"></Cell>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render label correctly', () => {
        const wrapper = mount(
            <Cell
                title="Custom Title"
                value="Custom Value"
                label="Custom Label">
            </Cell>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render icon correctly', () => {
        const wrapper = mount(
            <Cell title="单元格" icon="shop-o" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render extra correctly', () => {
        const wrapper = mount(
            <Cell title="单元格"
                icon="shop-o"
                rightIcon={<Icon name="search" className="search-icon" />}
                extra="extra"
            >
            </Cell>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should change arrow direction when using arrowDirection prop', () => {
        const wrapper = mount(
            <Cell title="title" value="value" isLink arrowDirection="down"></Cell>
        );
        expect(wrapper.find('.rc-cell__right-icon')).toMatchSnapshot();
    });

    it('should change title style when using titleStyle prop', () => {
        const wrapper = mount(
            <Cell title="title" titleStyle={{ color: "red" }} />
        );
        const title = wrapper.find('.rc-cell__title');
        expect(title.props().style.color).toEqual('red');
    });

    it('should change icon class prefix when using iconPrefix prop', () => {
        const wrapper = mount(
            <Cell icon='success' iconPrefix="my-icon" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should allow to disable clicakble when using isLink prop', () => {
        const wrapper = mount(
            <Cell clickable={false} isLink />
        );
        expect(wrapper.hasClass('rc-cell--clickable')).toBeFalsy();
    });

    it('should be wrappered by CellGroup', () => {
        const wrapper = mount(
            <CellGroup>
                <Cell title="单元格" value="内容" />
                <Cell title="单元格" value="内容" label="描述信息" />
            </CellGroup>

        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });


    it('should be wrappered by CellGroup with prop title', () => {
        const wrapper = mount(
            <CellGroup title="单元组">
                <Cell title="单元格" value="内容" />
                <Cell title="单元格" value="内容" label="描述信息" />
            </CellGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should be wrappered by CellGroup with prop border is false', () => {
        const wrapper = mount(
            <CellGroup title="单元组" border={false}>
                <Cell title="单元格" value="内容" />
                <Cell title="单元格" value="内容" label="描述信息" />
            </CellGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should be wrappered by CellGroup with prop inset', () => {
        const wrapper = mount(
            <CellGroup inset>
                <Cell title="单元格" value="内容" />
                <Cell title="单元格" value="内容" label="描述信息" />
            </CellGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    })

});
