import { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const REIC = () => {
  function handleSubmit(): void {
    throw new Error("Function not implemented.");
  }

  const formatCurrency = (purchasePrice: Number) => {
    if (!purchasePrice) return '';

    // Remove non-numeric characters except for .
    const numericValue = purchasePrice.toString().replace(/[^0-9.]/g, '');

    // Convert to number and format as currency
    const numberValue = parseFloat(numericValue);
    if (isNaN(numberValue)) return '';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
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
    loanTerm: formatCurrency(30),
    monthlyRentalIncome: formatCurrency(2000),
    otherMonthlyRentalIncome: formatCurrency(100),
    vacancyRate: formatPercentage(5),
    managmentRate: formatPercentage(5),
    maintenance: formatCurrency(100),
    repairs: formatCurrency(100),
    utilities: formatCurrency(200)
  });

  const cleanStrToNum = (str: string) => parseFloat(str.replace(/[^\d.-]/g, ''));


  const calculateMonthlyPayment = () => {
    const purchasePrice = cleanStrToNum(formData.purchasePrice);
    const percentDown = cleanStrToNum(formData.percentDown);
    const mortgageRate = cleanStrToNum(formData.mortgageRate);
    const loanTerm = cleanStrToNum(formData.loanTerm);
    
    const loanAmount = purchasePrice - (percentDown / 100) * purchasePrice;
    const monthlyRate = (mortgageRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
  
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  
    return monthlyPayment
  };

  const calculateTotalLoan = () => {
    const purchasePrice = cleanStrToNum(formData.purchasePrice);
    const percentDown = cleanStrToNum(formData.percentDown);
    const loanAmount = ((1-(percentDown/100)) * purchasePrice);
    return loanAmount;
  };
  
  const calculateTotalMonthlyIncome = ():number => {
    const monthlyRentalIncome = cleanStrToNum(formData.monthlyRentalIncome);
    const otherMonthlyRentalIncome = cleanStrToNum(formData.otherMonthlyRentalIncome);
    const vacancyRate = cleanStrToNum(formData.vacancyRate);

    const vacancy = (monthlyRentalIncome + otherMonthlyRentalIncome) * (1-vacancyRate/100);
    return vacancy;
  };
  
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


  // Calculate total mortgage cost whenever formData changes
  useEffect(() => {
    SetTotalMortageCost(calculateTotalLoan());
  }, [formData]);

  // Calculate monthly mortgage cost whenever formData changes
  useEffect(() => {
    SetMonthly(calculateMonthlyPayment());
  }, [formData]);

  useEffect(() => {
    SetTotalMonthlyIncome(calculateMonthlyPayment());
  }, [formData]);
  

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
              name="purchasePrice"
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
              name="purchasePrice"
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
          <Form.Group controlId="formManagementRate">
            <Form.Label>Management (%)</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="percentManagementRate"
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

  return (
    <Container className="mt-5 mb-5">
    <h2 className="text-center mb-5">Rental Property Calculator</h2>
      <Row className="justify-content-md-center">
        <Col md={12}>
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
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}



export default REIC;
