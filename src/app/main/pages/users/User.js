import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUser } from './store';
import reducer from './store';
import { Avatar, Card, CardContent, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	userImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	row: {
		display: 'flex',
		gap: '1rem'
	},
	col: {
		display: 'flex',
		flexDirection: 'column'
	},
	formControl: {
		margin: theme.spacing(3)
	},
	large: {
		width: '200px',
		height: '200px',
		cursor: 'pointer',
		margin: '0 auto'
	},
	name: {
		fontSize: '20px',
		fontWeight: 500,
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		maxWidth: '300px',
		whiteSpace: 'nowrap'
	}
}));

function User(props) {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store.users);
	const theme = useTheme();

	const classes = useStyles(props);
	const [noUser, noNoUser] = useState(false);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateUserState() {
			const userId = Number(routeParams.userId);
			if (userId) {
				dispatch(getUser(userId)).then(action => {
					if (!action.payload) {
						noNoUser(true);
					}
				});
			}
		}

		updateUserState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((user && !form) || (user && form && user.id !== form.id)) {
			setForm(user);
		}
	}, [form, user, setForm]);

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `avatar`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		return form.name.length > 0 && !_.isEqual(user, form);
	}

	if (noUser) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such user!
					</Typography>
					<Button
						className="normal-case mt-24"
						component={Link}
						variant="outlined"
						to="/users"
						color="inherit"
					>
						Go to Users Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if (!user || (user && routeParams.userId !== user.id)) {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/users"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Users</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">User profile</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-nowrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => console.log(form)}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			content={
				form && (
					<div className="p-12 flex flex-nowrap">
						<div className="flex flex-col sm:w-2/3">
							<div className="w-full p-12">
								<Card className="rounded-8">
									<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
										<Typography variant="subtitle1" color="inherit">
											Profile information
										</Typography>
									</div>

									<CardContent className="p-32 flex flex-col">
										<div className={classes.row}>
											<TextField
												className="mt-8 mb-16"
												required
												label="First Name"
												id="name"
												name="name"
												value={form.name}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
											<TextField
												className="mt-8 mb-16"
												label="Last Name"
												id="last_name"
												name="last_name"
												value={form.last_name}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</div>
										<div className="flex flex-no-wrap justify-between align-items-center w-full">
											<FormControl component="fieldset">
												<FormLabel component="legend">Position</FormLabel>
												<RadioGroup
													aria-label="position_id"
													name="position_id"
													value={form.position_id}
													onChange={handleChange}
												>
													<FormControlLabel
														value={0}
														control={<Radio />}
														label="Apprentice"
													/>
													<FormControlLabel value={1} control={<Radio />} label="Employee" />
													<FormControlLabel
														value={2}
														control={<Radio />}
														label="Business owner"
													/>
												</RadioGroup>
											</FormControl>
											<div className="sm:w-2/3">
												{!form.position_id && (
													<TextField
														className="mt-8 mb-16"
														label="Educational Institution"
														id="educational_institution"
														name="educational_institution"
														value={form.educational_institution}
														onChange={handleChange}
														variant="outlined"
														fullWidth
													/>
												)}
											</div>
										</div>
										<div className={classes.row}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Email"
												id="email"
												name="email"
												value={form.email}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
											<TextField
												className="mt-8 mb-16"
												label="Address"
												id="address"
												name="address"
												value={form.address}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</div>
										<div className={classes.row}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Work Radius"
												id="work_radius"
												name="work_radius"
												value={form.work_radius}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
											<TextField
												className="mt-8 mb-16"
												label="Year of experience"
												id="year_of_experience"
												name="year_of_experience"
												value={form.year_of_experience}
												onChange={handleChange}
												variant="outlined"
												type="number"
												fullWidth
											/>
											<TextField
												className="mt-8 mb-16"
												label="Trades"
												id="trade"
												name="trade"
												value={form.trade && form.trade.title}
												onChange={handleChange}
												variant="outlined"
												type="number"
												disabled
												fullWidth
											/>
										</div>
									</CardContent>
								</Card>
							</div>
							<div className="w-full p-12">
								<Card className="rounded-8">
									<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
										<Typography variant="subtitle1" color="inherit">
											Company information
										</Typography>
									</div>

									<CardContent className="p-32 flex flex-col">
										<div className={classes.row}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Company name"
												id="company_name"
												name="company_name"
												value={form.company_name}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
											<TextField
												className="mt-8 mb-16"
												label="Company ABN"
												id="company_abn"
												name="company_abn"
												value={form.company_abn}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</div>
										<div className="flex justify-center">
											<TextField
												className="mt-8 mb-16"
												required
												label="Company Web site"
												id="company_web_site"
												name="company_web_site"
												value={form.company_web_site}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
						<div className="flex flex-col sm:w-1/3">
							<div className="w-full p-12">
								<Card className="rounded-8">
									<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
										<Typography variant="subtitle1" color="inherit">
											Main information
										</Typography>
									</div>

									<CardContent className="p-32 pt-16 flex flex-col align-item-center justify-center">
										<Avatar
											alt="avatar"
											src={form.avatar}
											className={classes.large}
											onClick={() => {
												document.getElementById('button-file').click();
											}}
										/>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											onChange={handleUploadChange}
										/>
										<div className="flex gap-10 flex-wrap justify-center">
											<span className={classes.name}>{user.name}</span>
											<span className={classes.name}>{user.last_name}</span>
										</div>
									</CardContent>
								</Card>
							</div>
							<div className="w-full p-12">
								<Card className="rounded-8">
									<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
										<Typography variant="subtitle1" color="inherit">
											Change password
										</Typography>
									</div>
									<CardContent className="p-32 pt-16 flex flex-col align-item-center justify-center">
										<TextField
											className="mt-8 mb-16"
											label="New password"
											id="password"
											name="password"
											value={form.password}
											onChange={handleChange}
											variant="outlined"
											fullWidth
										/>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('users', reducer)(User);
