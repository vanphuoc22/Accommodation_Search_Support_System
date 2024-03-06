import base64
import requests
from django.shortcuts import render
from reportlab.lib.colors import toColor
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib3 import request

from ASSS import settings
from ASSSs.models import Payment


def get_access_token():
    client_id = settings.PAYPAL_CLIENT_ID
    secret_key = settings.PAYPAL_SECRET

    # Thông tin API OAuth 2.0 của PayPal
    oauth_url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    auth_header = f"{client_id}:{secret_key}"

    # Bảo mật Base64 của thông tin xác thực
    base64_auth = base64.b64encode(auth_header.encode("utf-8")).decode("utf-8")

    # Yêu cầu mã xác thực (Authorization Code)
    auth_response = requests.post(
        oauth_url,
        headers={
            "Authorization": f"Basic {base64_auth}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data="grant_type=client_credentials",
    )

    if auth_response.status_code == 200:
        access_token = auth_response.json()["access_token"]
        return access_token
        print(f"Access Token: {access_token}")
    else:
        print(f"Failed to get Access Token. Status code: {auth_response.status_code}")
        print(auth_response.text)


@api_view(['POST'])
def create_payment(request):
    your_paypal_access_token = get_access_token()
    data = request.data
    amount = data.get('amount')
    payment_id = data.get('payment_id')
    # breakpoint()
    # Thực hiện các thao tác cần thiết để tạo thanh toán
    # ...
    current_domain = request.get_host()
    # print(current_domain)
    # Gọi API PayPal để tạo thanh toán
    paypal_api_url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {your_paypal_access_token}",  # Thay thế bằng Access Token của bạn
    }

    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": f"{amount}",
                },
            }
        ],
        "application_context": {
            "return_url": f"http://{current_domain}/capture_payment/?token={your_paypal_access_token}",
            "cancel_url": f"http://{current_domain}/capture_payment/?token={your_paypal_access_token}",
        }
    }

    response = requests.post(paypal_api_url, json=payload, headers=headers)
    print(response)
    if response.status_code == 201:
        data = response.json()
        approval_url = next(link["href"] for link in data["links"] if link["rel"] == "approve")
        print(approval_url)
        position = approval_url.find("=")
        if position != -1:
            position += 1
            token = approval_url[position:]
            print(token)
            payment = Payment.objects.get(pk=payment_id)
            payment.token_paypal = token
            payment.total = amount
            payment.save()
        return Response(approval_url, status=status.HTTP_201_CREATED)
    else:
        return Response("error", status=status.HTTP_400_BAD_REQUEST)


def capture_payment(request):
    your_paypal_access_token = get_access_token()
    # Lấy thông tin từ query parameters
    order_id = request.GET.get("token")

    # Gọi API PayPal để xác nhận thanh toán
    capture_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {your_paypal_access_token}",  # Thay thế bằng Access Token của bạn
    }

    response = requests.post(capture_url, headers=headers)
    print(response)
    if response.status_code == 201:
        payment = Payment.objects.get(token_paypal=order_id)
        payment.active = 1
        payment.save()
        return render(request, "paypal/success.html")
        # return Response(True, status=status.HTTP_200_OK)
    else:
        return render(request, "paypal/error.html")
        # return Response(False, status=status.HTTP_402_PAYMENT_REQUIRED)


def check_pay_suc(request):
    payment_id = request.data.get('payment_id')
    payment = Payment.objects.get(pk=payment_id)
    # breakpoint()
    if payment.active == 1:
        return Response(True, status=status.HTTP_200_OK);
    else:
        return Response(False, status=status.HTTP_402_PAYMENT_REQUIRED);

@api_view(['POST'])
def create_payment_post(request):
    your_paypal_access_token = get_access_token()
    data = request.data
    amount = data.get('amount')
    payment_id = data.get('payment_id')
    post_id = data.get('post_id')
    # breakpoint()
    # Thực hiện các thao tác cần thiết để tạo thanh toán
    # ...
    current_domain = request.get_host()
    # print(current_domain)
    # Gọi API PayPal để tạo thanh toán
    paypal_api_url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {your_paypal_access_token}",  # Thay thế bằng Access Token của bạn
    }

    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": f"{amount}",
                },
            }
        ],
        "application_context": {
            "return_url": f"http://{current_domain}/capture_payment_post/?token={your_paypal_access_token}",
            "cancel_url": f"http://{current_domain}/capture_payment_post/?token={your_paypal_access_token}",
        }
    }

    response = requests.post(paypal_api_url, json=payload, headers=headers)
    print(response)
    if response.status_code == 201:
        data = response.json()
        approval_url = next(link["href"] for link in data["links"] if link["rel"] == "approve")
        print(approval_url)
        position = approval_url.find("=")
        if position != -1:
            position += 1
            token = approval_url[position:]
            print(token)
        return Response(approval_url, status=status.HTTP_201_CREATED)
    else:
        return Response("error", status=status.HTTP_400_BAD_REQUEST)


def capture_payment_post(request):
    your_paypal_access_token = get_access_token()
    # Lấy thông tin từ query parameters
    order_id = request.GET.get("token")

    # Gọi API PayPal để xác nhận thanh toán
    capture_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {your_paypal_access_token}",  # Thay thế bằng Access Token của bạn
    }

    response = requests.post(capture_url, headers=headers)
    print(response)
    if response.status_code == 201:
        payment = Payment.objects.get(token_paypal=order_id)
        payment.active = 1
        payment.post.status = 1
        payment.save()
        return render(request, "paypal/success.html")
        # return Response(True, status=status.HTTP_200_OK)
    else:
        return render(request, "paypal/error.html")
        # return Response(False, status=status.HTTP_402_PAYMENT_REQUIRED)