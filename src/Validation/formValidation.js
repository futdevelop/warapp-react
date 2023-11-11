import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
	name: Yup.string()
	.min(1, 'Too Short!')
	.max(20, 'Too Long!')
	.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	message: Yup.string()
	// .max(100, 'Too Long!')
	.required('Required'),
});

export default SignUpSchema;