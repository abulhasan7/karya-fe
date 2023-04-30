/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, Input, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import './JobCreator.css';

export default function JobCreator() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					textTransform: 'unset',
				}}
				onClick={handleClickOpen}
			>
				Create a Job
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					Lets get things done. A few steps before that.
				</DialogTitle>
				<DialogContent>
					<HorizontalLinearStepper />
				</DialogContent>
			</Dialog>
		</div>
	);
}

const steps = ['Some details.', 'More details please.', 'Estimates.'];

export function HorizontalLinearStepper() {
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const contentFormStepOne = (
		<TextField
			required
			sx={{
				width: '100%',
			}}
			size="small"
			id="outlined-required"
			label="Title"
			placeholder="Give your job a nice descriptive title."
		/>
	);

	const contentFormStepTwo = (
		<div>
			<Autocomplete
				multiple
				id="tags-outlined"
				options={top100Films}
				size="small"
				getOptionLabel={(option) => option.title}
				defaultValue={[top100Films[3]]}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField
						sx={{
							width: '100%',
						}}
						{...params}
						label="Categories"
						placeholder="Select categories which apply to your job."
					/>
				)}
			/>
			<br />
			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
				}}
				label="Description"
				multiline
				rows={6}
				placeholder="Please provide as many details here are possible."
				variant="standard"
			/>
		</div>
	);

	const contentFormStepThree = (
		<div>
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Estimated hours required."
				placeholder="How many hours do you think the job requires?"
			/>
			<br />
			<br />
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Estimated hourly budget in $"
				placeholder="What's your hourly budget in $?"
			/>
			<br />
			<br />
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Overall budget if applicable."
				placeholder="What's your soft budget overall in $?"
			/>
		</div>
	);
	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				// eslint-disable-next-line react/jsx-fragments
				<React.Fragment>
					<Typography sx={{ mt: 2, mb: 1 }}>
						All steps completed - you&apos;re finished
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="form-container">
						{activeStep === 0 && contentFormStepOne}
						{activeStep === 1 && contentFormStepTwo}
						{activeStep === 2 && contentFormStepThree}
					</div>

					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />

						<Button onClick={handleNext}>
							{activeStep === steps.length - 1
								? 'Finish'
								: 'Next'}
						</Button>
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
