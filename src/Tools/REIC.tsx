import { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";

const REIC = () => {
	function handleSubmit(): void {
		throw new Error("Function not implemented.");
	}

	const formatCurrency = (value: number | string) => {
    // Convert value to a number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
    // Check if numericValue is NaN or not a finite number
    if (isNaN(numericValue) || !isFinite(numericValue)) return '';
  
    // Format as currency using Intl.NumberFormat
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  };
  

	const formatPercentage = (value: number) => {
		if (!value) return '';

		// Remove non-numeric characters except for .
		const numericValue = value.toString().replace(/[^0-9.]/g, '');

		// Convert to number and format as percentage
		const numberValue = parseFloat(numericValue);
		if (isNaN(numberValue)) return '';

		return `${numberValue.toFixed(1)}%`;
	};

	const [formData, setFormData] = useState({
		address: '',
		purchasePrice: formatCurrency(100000),
		percentDown: formatPercentage(20),
		closingCosts: formatCurrency(2000),
		mortgageRate: formatPercentage(7),
		loanTerm: 30,
		monthlyRentalIncome: formatCurrency(2000),
		otherMonthlyRentalIncome: formatCurrency(100),
		vacancyRate: formatPercentage(5),
		managmentRate: formatPercentage(5),
		maintenance: formatCurrency(100),
		repairs: formatCurrency(100),
		utilities: formatCurrency(200),
		insurance: formatCurrency(1000),
		propTax: formatCurrency(4000),
		hoa: formatCurrency(500),
	});

	const cleanStrToNum = (str: string) => parseFloat(str.replace(/[^\d.-]/g, ''));

	const calculateMonthlyPayment = useCallback(() => {
		const purchasePrice = cleanStrToNum(formData.purchasePrice);
		const percentDown = cleanStrToNum(formData.percentDown);
		const mortgageRate = cleanStrToNum(formData.mortgageRate);
		const loanTerm = formData.loanTerm;

		const loanAmount = purchasePrice - (percentDown / 100) * purchasePrice;
		const monthlyRate = (mortgageRate / 100) / 12;
		const numberOfPayments = loanTerm * 12;

		const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

		return monthlyPayment
	}, [formData]);

	const calculateTotalLoan = useCallback(() => {
		const purchasePrice = cleanStrToNum(formData.purchasePrice);
		const percentDown = cleanStrToNum(formData.percentDown);
		const loanAmount = ((1-(percentDown/100)) * purchasePrice);
		return loanAmount;
	}, [formData]);

	const calculateTotalMonthlyIncome= useCallback(():number => {
		const monthlyRentalIncome = cleanStrToNum(formData.monthlyRentalIncome);
		const otherMonthlyRentalIncome = cleanStrToNum(formData.otherMonthlyRentalIncome);
		return monthlyRentalIncome + otherMonthlyRentalIncome;
	}, [formData]);

	const [totalMortageCost, SetTotalMortageCost] = useState(calculateTotalLoan());
	const [monthlyMortageCost, SetMonthly] = useState(calculateMonthlyPayment());
	const [totalMonthlyIncome, SetTotalMonthlyIncome] = useState(calculateTotalMonthlyIncome());

	const handleChange = (e: { target: { name: any; value: any; }; }) => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	useEffect(() => {
		SetTotalMortageCost(calculateTotalLoan());
		SetMonthly(calculateMonthlyPayment());
		SetTotalMonthlyIncome(calculateTotalMonthlyIncome());
	}, [formData, calculateTotalLoan, calculateMonthlyPayment, calculateTotalMonthlyIncome]);

	const handleBlurMoney = (event: { target: { name: any; value: any; }; }) => {
		const { name, value } = event.target;
		const formattedValue = formatCurrency(value);
		setFormData({
			...formData,
			[name]: formattedValue,
		});
	};

	const handleBlurPercentage = (event: { target: { name: any; value: any; }; }) => {
		const { name, value } = event.target;
		const formattedValue = formatPercentage(value);
		setFormData({
			...formData,
			[name]: formattedValue,
		});
	};

	const renderPurchaseDetails = (): JSX.Element => {
		return (
			<>
				<Row style={{ marginTop: '40px', textAlign: 'center' }}>
					<Col>
						<h3>Purchase Expenses</h3>
					</Col>
				</Row>

				<Row style={{ marginTop: '20px' }}>
					<Col md={2} className="offset-md-1">
						<Form.Group controlId="formPurchasePrice">
							<Form.Label>Purchase Price</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="purchasePrice"
								value={formData.purchasePrice}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formclosingCosts">
							<Form.Label>Closing Costs</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="closingCosts"
								value={formData.closingCosts}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formName">
							<Form.Label>Percent Down (%)</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="percentDown"
								value={formData.percentDown}
								onChange={handleChange}
								onBlur={handleBlurPercentage}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formMortgageRate">
							<Form.Label>Mortgage Rate (%)</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="mortgageRate"
								value={formData.mortgageRate}
								onChange={handleChange}
								onBlur={handleBlurPercentage}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formLoanTerm">
							<Form.Label>Loan Term (years)</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="loanTerm"
								value={formData.loanTerm}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					<Col md={9} className="offset-md-1">
						<Row>
							<Col>
              Total Mortgage Cost: {formatCurrency(totalMortageCost)}
							</Col>
						</Row>
						<Row>
							<Col>
              Monthly Mortgage Cost: {formatCurrency(monthlyMortageCost)}
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	}

	const renderIncomeDetails = (): JSX.Element => {
		return (
			<>
				<Row style={{ marginTop: '40px', textAlign: 'center' }}>
					<Col>
						<h3>Rental Income Details</h3>
					</Col>
				</Row>

				<Row style={{ marginTop: '20px' }}>
					<Col md={2} className="offset-md-3">
						<Form.Group controlId="formMonthlyRentalIncome">
							<Form.Label>Rental Income</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="monthlyRentalIncome"
								value={formData.monthlyRentalIncome}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formOtherMonthlyRentalIncome">
							<Form.Label>Other Income</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="otherMonthlyRentalIncome"
								value={formData.otherMonthlyRentalIncome}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formVacancyRate">
							<Form.Label>Vacancy (%)</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="vacancyRate"
								value={formData.vacancyRate}
								onChange={handleChange}
								onBlur={handleBlurPercentage}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					<Col md={9} className="offset-md-1">
						<Row>
							<Col>
              Total Monthly Income: {formatCurrency(totalMonthlyIncome)}
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	};
  

	const renderMonthlyExpenses = (): JSX.Element => {
		return (
			<>
				<Row style={{ marginTop: '40px', textAlign: 'center' }}>
					<Col>
						<h3>Monthly Expenses</h3>
					</Col>
				</Row>

				<Row style={{ marginTop: '20px' }}>
					<Col md={2} className="offset-md-2">
						<Form.Group controlId="formManagmentRate">
							<Form.Label>Management (%)</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="managmentRate"
								value={formData.managmentRate}
								onChange={handleChange}
								onBlur={handleBlurPercentage}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formMaintenance">
							<Form.Label>Maintenance</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="maintenance"
								value={formData.maintenance}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formRepairs">
							<Form.Label>Repairs</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="repairs"
								value={formData.repairs}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formUtilities">
							<Form.Label>Utilities</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="utilities"
								value={formData.utilities}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
				</Row>
			</>
		);
	};

	const renderAnnualExpenses = (): JSX.Element => {
		return (
			<>
				<Row style={{ marginTop: '40px', textAlign: 'center' }}>
					<Col>
						<h3>Annual Expenses</h3>
					</Col>
				</Row>

				<Row style={{ marginTop: '20px' }}>
					<Col md={2} className="offset-md-3">
						<Form.Group controlId="formInsurance">
							<Form.Label>Insurance</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="insurance"
								value={formData.insurance}
								onChange={handleChange}
								onBlur={handleBlurPercentage}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formPropTax">
							<Form.Label>Property Tax</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="propTax"
								value={formData.propTax}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="formHOA">
							<Form.Label>HOA</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="hoa"
								value={formData.hoa}
								onChange={handleChange}
								onBlur={handleBlurMoney}
								prefix={'$'}
								required                  />
						</Form.Group>
					</Col>
				</Row>
			</>
		);
	};


  const monthlyToYrly = (str: any) => cleanStrToNum(str.toString())*12;
  const yearlyToMonthly = (str: any) => cleanStrToNum(str)/12;

  
  const renderSummary = (): JSX.Element => {

  const financialData = {
    income:{
      rentalIncome: {
        monthly: cleanStrToNum(formData.monthlyRentalIncome),
        annually: monthlyToYrly(formData.monthlyRentalIncome),
      },
    },
    expense:{
        mortgage: {
          monthly: monthlyMortageCost,
          annually: monthlyToYrly(monthlyMortageCost)
        },
        managementFees: {
          monthly: totalMonthlyIncome * (cleanStrToNum(formData.managmentRate)/100),
          annually: totalMonthlyIncome * (cleanStrToNum(formData.managmentRate)/100) * 12
        },
        vacancy: {
          monthly: totalMonthlyIncome * (cleanStrToNum(formData.vacancyRate)/100),
          annually: totalMonthlyIncome * (cleanStrToNum(formData.vacancyRate)/100) * 12
        },
        insurance: {
          monthly: yearlyToMonthly(formData.insurance),
          annually: cleanStrToNum(formData.insurance)
        },
        taxes: {
          monthly: yearlyToMonthly(formData.propTax),
          annually: cleanStrToNum(formData.propTax)
        },
        repairs: {
          monthly: cleanStrToNum(formData.repairs),
          annually: monthlyToYrly(formData.repairs)
        },
        maintenance: {
          monthly: cleanStrToNum(formData.maintenance),
          annually: monthlyToYrly(formData.maintenance)
        },
        utilities: {
          monthly: cleanStrToNum(formData.utilities),
          annually: monthlyToYrly(formData.utilities)
        },
        hoa: {
          monthly: cleanStrToNum(formData.hoa),
          annually: monthlyToYrly(formData.hoa)
        },

      }
    };



  const sumMonthlyExpenses = () => {
    return formatCurrency(Object.values(financialData.expense).reduce(
      (total, expense) => total + (expense.monthly || 0),
      0
    ));
  };

  const sumAnnualExpenses = () => {
    return formatCurrency(Object.values(financialData.expense).reduce(
      (total, expense) => total + (expense.annually || 0),
      0
    ));
  };

		return (
			<>
        <Row>
          <Col md={7}>
            <Table striped bordered hover className="mt-4 compact-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Monthly</th>
                    <th>Annually</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gross Income</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.monthly)}</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.annually)}</td>
                  </tr>
                  <tr>
                    <td>Mortgage Payment</td>
                    <td>{formatCurrency(financialData.expense.mortgage.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.mortgage.annually)}</td>
                  </tr>
                  <tr>
                    <td>Insurance</td>
                    <td>{formatCurrency(financialData.expense.insurance.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.insurance.annually)}</td>
                  </tr>
                  <tr>
                    <td>Taxes</td>
                    <td>{formatCurrency(financialData.expense.taxes.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.taxes.annually)}</td>
                  </tr>
                  <tr>
                    <td>Management Fees</td>
                    <td>{formatCurrency(financialData.expense.managementFees.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.managementFees.annually)}</td>
                  </tr>
                  <tr>
                    <td>Repairs</td>
                    <td>{formatCurrency(financialData.expense.repairs.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.repairs.annually)}</td>
                  </tr>
                  <tr>
                    <td>Maintenance</td>
                    <td>{formatCurrency(financialData.expense.maintenance.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.maintenance.annually)}</td>
                  </tr>
                  <tr>
                    <td>Vacancy</td>
                    <td>{formatCurrency(financialData.expense.vacancy.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.vacancy.annually)}</td>
                  </tr>
                  <tr>
                    <td>HOA</td>
                    <td>{formatCurrency(financialData.expense.hoa.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.hoa.annually)}</td>
                  </tr>
                  <tr>
                    <td>Utilities</td>
                    <td>{formatCurrency(financialData.expense.utilities.monthly)}</td>
                    <td>{formatCurrency(financialData.expense.utilities.annually)}</td>
                  </tr>
                  <tr>
                    <td>Expenses</td>
                    <td>{sumMonthlyExpenses()}</td>
                    <td>{sumAnnualExpenses()}</td>
                  </tr>
                </tbody>
            </Table>
          </Col>
          <Col md={5}>
            <Table striped bordered hover className="mt-4 compact-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Monthly</th>
                    <th>Annually</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.monthly)}</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.annually)}</td>
                  </tr>
                  <tr>
                    <td>Expenses</td>
                    <td>{sumMonthlyExpenses()}</td>
                    <td>{sumAnnualExpenses()}</td>
                  </tr>
                  <tr>
                    <td>Cash Flow</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.monthly - cleanStrToNum(sumMonthlyExpenses()))}</td>
                    <td>{formatCurrency(financialData.income.rentalIncome.annually - cleanStrToNum(sumAnnualExpenses()))}</td>
                  </tr>
                </tbody>
                
            </Table>
          </Col>
        </Row>
			</>
		);
	};

	return (
		<Container className="mt-5 mb-5">
			<h2 className="text-center mb-5">Rental Property Calculator</h2>
			<Row className="justify-content-md-center">
				<Col sm={10}>
					<Card>
						<Card.Header>
              This tool rovides data analysis for potential rental property investments.
						</Card.Header>
						<Card.Body>
							<Form onSubmit={handleSubmit}>
								<Row style={{ marginTop: '10px' }}>
									<Form.Group controlId="formName">
										<Form.Label>Address</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter the address"
											name="address"
											value={formData.address}
											onChange={handleChange}
											required
										/>
									</Form.Group>
								</Row>
								{renderPurchaseDetails()}
								{renderIncomeDetails()}
								{renderMonthlyExpenses()}
								{renderAnnualExpenses()}
                {renderSummary()}
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default REIC;
