import React from 'react';

import { render } from '@testing-library/react-native';
import TextBox from '../compoents/Atoms/Textbox/TextBox'; // Assuming TextBox component is exported from TextBox.tsx

//...

  
describe('TextBox Component', () => {
    it('renders with custom styles', () => {
        // Render the TextBox component
        const { getByTestId } = render(
            <TextBox
                value=""
                onChange={() => { }}
                onFocus={() => { }}
                onBlur={() => { }}
                placeholder="Enter text here"
                width={200}
                icon="age"
                fontColor="black"
            />
        );

        // Get the elements by testID
        const iconElement = getByTestId('icon-element-textBox');
        const textBoxElement = getByTestId('text-box');

        // Check styles using toHaveStyle
        expect(iconElement).toHaveStyle({
            marginRight: 10,
            height: 20,
            width: 20,
            tintColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
        });

        expect(textBoxElement).toHaveStyle({
            height: 40,
            width: 200,
           
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            paddingLeft: 10,
        });
    });
});
