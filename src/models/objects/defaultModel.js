import {CompileModel, Contour} from '../interfaces/compileModel'

const defaultModel = new CompileModel('', []);

for (let i = 1; i <= 8; i++) {
    const contour = new Contour(i, []);
    defaultModel.contours.push(contour);
}

export default defaultModel;